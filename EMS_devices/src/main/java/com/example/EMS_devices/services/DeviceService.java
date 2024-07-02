package com.example.EMS_devices.services;


import com.example.EMS_devices.dtos.DeviceDTO;
import com.example.EMS_devices.entities.DeviceEntity;
import com.example.EMS_devices.repositories.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    public List<DeviceEntity> getDevices(){
        return deviceRepository.findAll();
    }

    public DeviceEntity createDevice(DeviceDTO device){
        DeviceEntity entity = new DeviceEntity();
        //entity.setDeviceID(UUID.randomUUID());
        entity.setMax_consumption(device.getMax_consumption());
        entity.setDescription(device.getDescription());
        entity.setAddress(device.getAddress());
        deviceRepository.save(entity);
        return entity;
    }

    public UUID deleteDevice(UUID id){
        DeviceEntity device = deviceRepository.findByDeviceID(id);
        System.out.println("device: " + device.getDeviceID());
        deviceRepository.delete(device);
        return device.getDeviceID();
    }

    public DeviceEntity updateUser(UUID id, DeviceDTO deviceDTO){
        DeviceEntity device = deviceRepository.findByDeviceID(id);
        device.setAddress(deviceDTO.getAddress());
        device.setDescription(deviceDTO.getDescription());
        device.setMax_consumption(deviceDTO.getMax_consumption());
        return deviceRepository.save(device);
    }
}
