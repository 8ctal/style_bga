package com.mongodb.backestilobga.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.backestilobga.dto.LoginRequestDTO;
import com.mongodb.backestilobga.modelo.Usuario;
import com.mongodb.backestilobga.repositorio.UsuarioRepositorio;
import com.mongodb.backestilobga.security.UsuarioDetailsServiceImpl;
import com.mongodb.backestilobga.security.jwt.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthContoller {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getCorreo(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getCorreo());
            String token = jwtUtil.generateToken(userDetails);

            // Obtener el usuario completo para incluir el idUsuario
            Usuario usuario = usuarioRepositorio.findByCorreoElectronico(loginRequest.getCorreo())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            // Crear respuesta con token y datos del usuario
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("idUsuario", usuario.getIdUsuario());
            response.put("nombres", usuario.getNombres());
            response.put("apellidos", usuario.getApellidos());
            response.put("rol", usuario.getRol());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }
} 