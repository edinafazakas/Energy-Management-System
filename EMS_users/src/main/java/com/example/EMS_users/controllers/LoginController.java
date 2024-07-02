package com.example.EMS_users.controllers;

import com.example.EMS_users.entites.UserEntity;
import com.example.EMS_users.jwt.JwtTokenService;
import com.example.EMS_users.repositories.UserRepository;
import com.example.EMS_users.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class LoginController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtTokenService jwtTokenService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        List<UserEntity> userEntities = userRepository.findAll();
        for (UserEntity u : userEntities) {
            if (!u.getUsername().equals("") && (!u.getPassword().equals("") && (u.getUsername().equals(username)) && (u.getPassword().equals(password)))) {
                System.out.println(u.getUsername() + " " + u.getPassword());
                String token = jwtTokenService.generateToken(u.getUsername());

                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                response.put("role", u.getRole());
                response.put("secretKey", jwtTokenService.getSecretKey()); // Include the secret key in the response

                System.out.println("Response: " + response);
                System.out.println("generated secretkey " + jwtTokenService.getSecretKey());
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "Invalid username or password"));
    }
}
