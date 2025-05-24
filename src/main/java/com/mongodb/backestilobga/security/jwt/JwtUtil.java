package com.mongodb.backestilobga.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret}") // Clave secreta para firmar el token (deberías guardarla de forma segura)
    private String claveSecreta;

    @Value("${jwt.expiration}") // Tiempo de expiración del token en milisegundos
    private Long tiempoExpiracion;

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
        // Aquí puedes agregar más información (claims) al token si es necesario, por ejemplo, roles
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