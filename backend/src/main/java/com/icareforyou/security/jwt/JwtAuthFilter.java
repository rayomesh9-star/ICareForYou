package com.icareforyou.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring("Bearer ".length());
        if (!jwtService.isValid(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        var claims = jwtService.parse(token).getBody();
        String subject = claims.getSubject();

        // Expect a claim "roles" as List<String>
        Object rolesObj = claims.get("roles");
        Collection<SimpleGrantedAuthority> authorities = List.<String>of().getClass().equals(rolesObj == null ? null : rolesObj.getClass())
                ? List.<String>of().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList())
                : (rolesObj instanceof List<?> list)
                    ? list.stream().filter(x -> x instanceof String).map(Object::toString).map(SimpleGrantedAuthority::new).collect(Collectors.toList())
                    : List.<SimpleGrantedAuthority>of();

        Authentication auth = new UsernamePasswordAuthenticationToken(subject, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(auth);
        filterChain.doFilter(request, response);
    }
}

