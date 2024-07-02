package com.example.EMS_users.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class JwtTokenService {

    private String secretKey = "vhvfdQ4GBXvFfGvFlSHlPBCNyJI0DRtG";

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public boolean isTokenValid(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            System.out.println("Token is valid");
            System.out.println("Claims: " + claims.getBody());
            System.out.println("Algorithm: " + claims.getHeader().getAlgorithm());
            return true;
        } catch (Exception e) {
            System.out.println("Token validation failed: " + e.getMessage());
            return false;
        }
    }
}


