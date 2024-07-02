package com.example.EMS_devices.controllers;

import com.example.EMS_devices.dtos.DeviceDTO2;
import com.example.EMS_devices.dtos.UserDeviceDTO;
import com.example.EMS_devices.entities.DeviceEntity;
import com.example.EMS_devices.entities.UserDeviceEntity;
import com.example.EMS_devices.services.UserDeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
public class UserDevicesController {

    @Autowired
    private UserDeviceService userDeviceService;

    @GetMapping("/getUserDevices")
    public List<UserDeviceDTO> getUserDevices(){
        return userDeviceService.getUserDevices();
    }

//    @GetMapping("/getClientsDevices/{userID}")
//    public List<DeviceDTO2> getClientsUserDevices(@PathVariable UUID userID){
//        return userDeviceService.getClientsDevices(userID);
//    }

}
