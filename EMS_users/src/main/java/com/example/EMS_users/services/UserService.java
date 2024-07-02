package com.example.EMS_users.services;

import com.example.EMS_users.dtos.UserDTOPost;
import com.example.EMS_users.entites.UserEntity;
import com.example.EMS_users.jwt.JwtTokenService;
import com.example.EMS_users.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtTokenService jwtTokenProvider;

    public UserEntity create(UserEntity userEntity){
        return userRepository.save(userEntity);
    }

    public UserEntity postUser(UserDTOPost userDTOPost){
        UserEntity userEntity = new UserEntity();
        userEntity.setName(userDTOPost.getName());
        userEntity.setUsername(userDTOPost.getUsername());
        userEntity.setPassword(userDTOPost.getPassword());
        userEntity.setRole("client");
        userRepository.save(userEntity);
        return userEntity;
    }

    public List<UserEntity> getUsers(){
        List<UserEntity> userEntities = new ArrayList<>();
        for(UserEntity u: userRepository.findAll()){
            if(!u.getRole().equals("admin")){
                userEntities.add(u);
            }
        }
        return userEntities;
    }

    public UserEntity deleteUser(UUID id){
        UserEntity userEntity = userRepository.findByUserID(id);
        userRepository.delete(userEntity);
        return userEntity;
    }

    public UserEntity updateUser(UUID id, UserDTOPost userEntity){
        UserEntity userEntity1 = userRepository.findByUserID(id);
        userEntity1.setName(userEntity.getName());
        userEntity1.setUsername(userEntity.getUsername());
        userEntity1.setPassword(userEntity.getPassword());
        userEntity1.setRole("client");
        return userRepository.save(userEntity1);
    }

    public UUID getIDBYUsername(String username){
        UserEntity userEntity = userRepository.findByUsername(username);
        return userEntity.getUserID();
    }
}
