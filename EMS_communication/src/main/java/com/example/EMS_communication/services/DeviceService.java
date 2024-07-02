package com.example.EMS_communication.services;

import com.example.EMS_communication.entities.DeviceEntity;
import com.example.EMS_communication.repos.DeviceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DeviceService {
    @Autowired
    DeviceRepo deviceRepo;

    public List<DeviceEntity> getAllDevices(){
        return deviceRepo.findAll();
    }

    public DeviceEntity getDeviceById(UUID deviceId){
        return deviceRepo.findByDeviceID(deviceId);

    }

    public void saveDevice(DeviceEntity device){
        deviceRepo.save(device);
    }
}
