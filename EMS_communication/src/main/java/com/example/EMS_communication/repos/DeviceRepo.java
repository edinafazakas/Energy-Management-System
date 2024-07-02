package com.example.EMS_communication.repos;

import com.example.EMS_communication.entities.DeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DeviceRepo  extends JpaRepository<DeviceEntity, UUID> {
    public DeviceEntity findByDeviceID(UUID id);
}
