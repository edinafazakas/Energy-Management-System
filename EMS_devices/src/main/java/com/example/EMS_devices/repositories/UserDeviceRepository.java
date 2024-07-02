package com.example.EMS_devices.repositories;

import com.example.EMS_devices.entities.UserDeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDeviceRepository extends JpaRepository<UserDeviceEntity, Integer> {

}
