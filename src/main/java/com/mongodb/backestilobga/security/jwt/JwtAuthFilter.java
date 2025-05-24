package com.mongodb.backestilobga.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil; // Inyectamos la utilidad para trabajar con JWT (validar, extraer info)

    @Autowired
    private UserDetailsService userDetailsService; // Inyectamos el servicio para cargar detalles del usuario por su nombre (correo)

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Intentar obtener la cabecera de autorizacion
        final String authHeader = request.getHeader("Authorization");

        String jwt = null; // Variable para almacenar el token JWT
        String username = null; // Variable para almacenar el nombre de usuario (correo) extraido del token

        // 2. Verificar si la cabecera de autorizacion existe y comienza con "Bearer "
        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7); // Extraemos el token, omitiendo "Bearer " (7 caracteres)
            username = jwtUtil.extractUsername(jwt); // Usamos JwtUtil para obtener el nombre de usuario del token
        }

        // 3. Si se encontro un nombre de usuario en el token Y no hay una autenticacion ya establecida
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Cargar los detalles del usuario desde la base de datos usando el nombre de usuario del token
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            // 4. Validar el token usando JwtUtil y los detalles del usuario cargados
            if (jwtUtil.validateToken(jwt, userDetails)) {
                // Si el token es válido, creamos un objeto de autenticacion
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                // Establecemos los detalles de la autenticacion web (como la direccion IP del cliente, etc.)
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // Establecemos la autenticacion en el contexto de seguridad de Spring
                // Esto indica que el usuario está autenticado para la peticion actual
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
            // Si el token no es valido, la autenticacion fallará y la peticion seguirá sin autenticar
        }

        // 5. Continuar con el siguiente filtro en la cadena
        // Si no se encontro un token valido o la autenticacion fallo, los filtros posteriores (como los de autorizacion) decidiran si la peticion debe ser rechazada.
        filterChain.doFilter(request, response);
    }
}