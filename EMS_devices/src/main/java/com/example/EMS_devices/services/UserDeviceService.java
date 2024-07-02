package com.example.EMS_devices.services;

import com.example.EMS_devices.dtos.DeviceDTO2;
import com.example.EMS_devices.dtos.UserDeviceDTO;
import com.example.EMS_devices.entities.DeviceEntity;
import com.example.EMS_devices.entities.UserDeviceEntity;
import com.example.EMS_devices.entities.UserEntity;
import com.example.EMS_devices.repositories.DeviceRepository;
import com.example.EMS_devices.repositories.UserDeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserDeviceService {
    @Autowired
    private UserDeviceRepository userDeviceRepository;
    @Autowired
    private DeviceRepository deviceRepository;

    public List<UserDeviceDTO> getUserDevices(){
        List<UserDeviceDTO> userDeviceDTOS = new ArrayList<>();
        for(UserDeviceEntity u: userDeviceRepository.findAll()){
            UserDeviceDTO userDeviceDTO = new UserDeviceDTO();

//            // Add a null check before accessing getUser()
//            if (u.getUser() != null) {
//                userDeviceDTO.setUserid(u.getUser().getUserId());
//            } else {
//            }
//
//            if (u.getDevice() != null) {
//                userDeviceDTO.setDeviceid(u.getDevice().getDeviceID());
//            } else {
//            }

            userDeviceDTO.setId(u.getId());
            userDeviceDTOS.add(userDeviceDTO);
        }
        return userDeviceDTOS;
    }



//        public List<DeviceDTO2> getClientsDevices(UUID userID) {
//        List<DeviceDTO2> deviceEntities = new ArrayList<>();
//        List<DeviceEntity> devices = deviceRepository.findAll();
//        for (DeviceEntity d : devices) {
//            d.getUserDevices().size(); // This triggers the lazy loading
//            for (UserDeviceEntity u : d.getUserDevices()) {
//                if (u.getUser().getUserId().equals(userID)) {
//                    DeviceDTO2 device = new DeviceDTO2();
//                    device.setDeviceID(u.getDevice().getDeviceID());
//                    device.setDescription(u.getDevice().getDescription());
//                    device.setAddress(u.getDevice().getAddress());
//                    device.setMax_consumption(u.getDevice().getMax_consumption());
//                    deviceEntities.add(device);
//                }
//            }
//        }
//        return deviceEntities;
//    }

}
