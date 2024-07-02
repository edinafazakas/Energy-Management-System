package com.example.EMS_users.controllers;

import com.example.EMS_users.dtos.UserDTOPost;
import com.example.EMS_users.entites.UserEntity;
import com.example.EMS_users.jwt.JwtTokenService;
import com.example.EMS_users.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenService jwtTokenService;

    @PostMapping("/postUser")
    public UserEntity postUser(@RequestBody UserDTOPost userDTOPost, @RequestHeader("Authorization") String token){
        if (jwtTokenService.isTokenValid(token.replace("Bearer ", ""))) {
            return userService.postUser(userDTOPost);
        } else {
            return null;
        }
    }

    @GetMapping("/users")
    public List<UserEntity> getUsers(@RequestHeader("Authorization") String token) {
        System.out.println("token from users " + token);
        if (jwtTokenService.isTokenValid(token.replace("Bearer ", ""))) {
            return userService.getUsers();
        } else {
            return Collections.emptyList();
        }
    }


    @PostMapping("/secureResource")
    public String getSecureResource(@RequestBody UserEntity user) {
        System.out.println("Received user: " + user.getUsername() + ", " + user.getPassword());
        String token = jwtTokenService.generateToken(user.getUsername());
        System.out.println("Generated token: " + token);
        return token;
    }


    @GetMapping("/findByUsername/{username}")
    public UUID findByUsername(@PathVariable String username) {
        return userService.getIDBYUsername(username);
    }

    @DeleteMapping("/deleteUser/{id}")
    public UserEntity deleteUser(@PathVariable UUID id, @RequestHeader("Authorization") String token){
        if (jwtTokenService.isTokenValid(token.replace("Bearer ", ""))) {
            return userService.deleteUser(id);
        } else {
            return null;
        }
    }

    @PatchMapping("/updateUser/{id}")
    public UserEntity updateUser(@PathVariable UUID id, @RequestBody UserDTOPost userEntity, @RequestHeader("Authorization") String token){
        if (jwtTokenService.isTokenValid(token.replace("Bearer ", ""))) {
            return userService.updateUser(id, userEntity);
        } else {
            return null;
        }
    }
}
