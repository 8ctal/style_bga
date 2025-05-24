package com.mongodb.backestilobga.security;

import com.mongodb.backestilobga.modelo.Usuario;
import com.mongodb.backestilobga.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UsuarioDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Override
    public UserDetails loadUserByUsername(String correoElectronico) throws UsernameNotFoundException {
        System.out.println("Intentando cargar usuario con correo: " + correoElectronico);
        try {
            Usuario usuario = usuarioRepositorio.findByCorreoElectronico(correoElectronico)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
            System.out.println("Usuario encontrado: " + usuario.getCorreoElectronico() + ", Contraseña: " + usuario.getPassword() + ", Rol: " + usuario.getRol());

            // Crear la lista de GrantedAuthority a partir del rol del usuario (si 'rol' es un Enum)
            List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + usuario.getRol().name().toUpperCase()));

            return new User(usuario.getCorreoElectronico(), usuario.getPassword(), authorities);
        } catch (Exception e) {
            System.err.println("Error en loadUserByUsername: " + e.getMessage());
            throw e; // Re-lanza la excepción para que Spring Security la maneje
        }
    }
}