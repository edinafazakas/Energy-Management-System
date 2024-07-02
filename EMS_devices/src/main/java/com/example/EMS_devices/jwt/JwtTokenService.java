package com.example.EMS_devices.jwt;

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

    public boolean isTokenValid(String token, String secretKey1) {
        try {
            secretKey1 = secretKey;
            Jwts.parser().setSigningKey(secretKey1).parseClaimsJws(token);
            System.out.println("Token is valid");
            return true;
        } catch (Exception e) {
            System.out.println("Token validation failed");
            return false;
        }
    }
}


