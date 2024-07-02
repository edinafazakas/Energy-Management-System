package com.example.EMS_users.repositories;

import com.example.EMS_users.entites.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    UserEntity deleteByUserID(UUID id);
    UserEntity findByUserID(UUID id);
    UserEntity findByUsername(String username);
}
