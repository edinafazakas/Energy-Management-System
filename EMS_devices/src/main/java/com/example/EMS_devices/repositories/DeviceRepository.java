package com.example.EMS_devices.repositories;

import com.example.EMS_devices.entities.DeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface DeviceRepository extends JpaRepository<DeviceEntity, UUID> {

    DeviceEntity findByDeviceID(UUID id);
}
