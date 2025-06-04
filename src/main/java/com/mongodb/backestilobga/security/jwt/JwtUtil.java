package com.mongodb.backestilobga.security.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.mongodb.backestilobga.modelo.Usuario;
import com.mongodb.backestilobga.repositorio.UsuarioRepositorio;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    @Value("${jwt.secret}") // Clave secreta para firmar el token (deberías guardarla de forma segura)
    private String claveSecreta;

    @Value("${jwt.expiration}") // Tiempo de expiración del token en milisegundos
    private Long tiempoExpiracion;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    // Metodo para extraer el nombre de usuario (correo electrónico) del token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Metodo para extraer la fecha de expiración del token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Metodo genérico para extraer un claim específico del token
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Metodo para extraer todos los claims del token
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(claveSecreta).parseClaimsJws(token).getBody();
    }

    // Metodo para verificar si el token ha expirado
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Metodo para generar el token para un usuario
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        
        // Obtener el usuario completo de la base de datos
        Usuario usuario = usuarioRepositorio.findByCorreoElectronico(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Agregar información adicional al token
        claims.put("rol", usuario.getRol().name());
        claims.put("nombres", usuario.getNombres());
        claims.put("apellidos", usuario.getApellidos());
        
        return createToken(claims, userDetails.getUsername());
    }

    // Metodo principal para crear el token
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + tiempoExpiracion))
                .signWith(SignatureAlgorithm.HS256, claveSecreta) // Algoritmo de firma y clave secreta
                .compact(); // Compacter el JWT a una cadena URL-safe
    }

    // Metodo para validar el token
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}