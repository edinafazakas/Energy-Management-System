package com.example.EMS_devices.controllers;

import com.example.EMS_devices.dtos.DeviceDTO;
import com.example.EMS_devices.entities.DeviceEntity;
import com.example.EMS_devices.jwt.JwtTokenService;
import com.example.EMS_devices.services.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private JwtTokenService jwtTokenService;

    @GetMapping("/getDevices")
    public ResponseEntity<List<DeviceEntity>> getDevices(@RequestHeader("Authorization") String token, @RequestHeader("Secret-Key") String secretKey) {
        System.out.println("Received token: " + token);
        System.out.println("Received secret key: " + secretKey);
        if (jwtTokenService.isTokenValid(token.replace("Bearer ", ""), secretKey)) {
            for (DeviceEntity d : deviceService.getDevices()) {
                System.out.println("id: " + d.getDeviceID());
            }
            return new ResponseEntity<>(deviceService.getDevices(), HttpStatus.OK);
        } else {
            System.out.println("Token or secret key is not valid");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/createDevice")
    public ResponseEntity<DeviceEntity> createDevice(@RequestBody DeviceDTO deviceDto, @RequestHeader("Authorization") String token, @RequestHeader("Secret-Key") String secretKey) {
        if (jwtTokenService.isTokenValid(token.replace("Bearer ", ""), secretKey)) {
            return new ResponseEntity<>(deviceService.createDevice(deviceDto), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/deleteDevice/{id}")
    public ResponseEntity<UUID> deleteDevice(@PathVariable UUID id, @RequestHeader("Authorization") String token, @RequestHeader("Secret-Key") String secretKey) {
        if (jwtTokenService.isTokenValid(token.replace("Bearer ", ""), secretKey)) {
            deviceService.deleteDevice(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PatchMapping("/updateDevice/{id}")
    public ResponseEntity<DeviceEntity> updateUser(@PathVariable UUID id, @RequestBody DeviceDTO userEntity, @RequestHeader("Authorization") String token, @RequestHeader("Secret-Key") String secretKey) {
        if (jwtTokenService.isTokenValid(token.replace("Bearer ", ""), secretKey)) {
            return new ResponseEntity<>(deviceService.updateUser(id, userEntity), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
