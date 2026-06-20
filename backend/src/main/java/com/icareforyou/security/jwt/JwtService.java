package com.icareforyou.security.jwt;

import com.icareforyou.config.SecurityProperties;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {

    private final SecurityProperties properties;

    public JwtService(SecurityProperties properties) {
        this.properties = properties;
    }

    private Key signingKey() {
        byte[] keyBytes = Decoders.BASE64.decode(properties.getSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String createAccessToken(String subject, Map<String, Object> claims) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + properties.getAccessTokenTtlSeconds() * 1000L);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuer(properties.getIssuer())
                .setAudience(properties.getAudience())
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(signingKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Jws<Claims> parse(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey())
                .build()
                .parseClaimsJws(token);
    }

    public boolean isValid(String token) {
        try {
            parse(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}

