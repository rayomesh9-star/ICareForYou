package com.icareforyou.security.auth;

import com.icareforyou.security.jwt.JwtService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {

    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    // NOTE: This is a placeholder. Next step will wire it to JPA repositories.
    public AuthResponse login(AuthRequest request) {
        // In a real implementation: verify user + password hash + load roles.
        String fakeUserId = UUID.nameUUIDFromBytes(request.getEmail().getBytes()).toString();
        String role = "ROLE_PATIENT";

        String token = jwtService.createAccessToken(fakeUserId, Map.of(
                "roles", List.of(role)
        ));

        return new AuthResponse(token);
    }

    public AuthResponse register(RegisterRequest request) {
        String fakeUserId = UUID.nameUUIDFromBytes((request.getEmail() + ":" + request.getRole()).getBytes()).toString();

        String token = jwtService.createAccessToken(fakeUserId, Map.of(
                "roles", List.of(request.getRole())
        ));

        // passwordEncoder usage is kept for the upcoming real registration implementation.
        passwordEncoder.encode(request.getPassword());

        return new AuthResponse(token);
    }
}

