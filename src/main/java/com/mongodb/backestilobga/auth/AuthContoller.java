package com.mongodb.backestilobga.auth;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.backestilobga.dto.LoginRequestDTO;
import com.mongodb.backestilobga.dto.LoginResponseDTO;
import com.mongodb.backestilobga.modelo.Usuario;
import com.mongodb.backestilobga.repositorio.UsuarioRepositorio;
import com.mongodb.backestilobga.security.jwt.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {
    RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS
})
public class AuthContoller {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService; // Necesitamos esto para generar el token con la información del usuario

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getCorreo(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getCorreo());
            String token = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new LoginResponseDTO(token));

        } catch (Exception e) {
            System.err.println("Error en la autenticación: " + e.getMessage()); // Agrega este log
            return new ResponseEntity<>("Error en las credenciales", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        try {
            // Verificar si el correo ya existe
            if (usuarioRepositorio.findByCorreoElectronico(usuario.getCorreoElectronico()).isPresent()) {
                return new ResponseEntity<>("El correo electrónico ya está registrado", HttpStatus.BAD_REQUEST);
            }

            // Establecer el rol como cliente por defecto
            usuario.setRol(Usuario.Rol.cliente);
            
            // Establecer la fecha de registro
            usuario.setFechaRegistro(new Date());
            
            // Encriptar la contraseña
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

            // Guardar el usuario
            Usuario usuarioGuardado = usuarioRepositorio.save(usuario);

            return new ResponseEntity<>(usuarioGuardado, HttpStatus.CREATED);

        } catch (Exception e) {
            System.err.println("Error en el registro: " + e.getMessage());
            return new ResponseEntity<>("Error al registrar el usuario", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}