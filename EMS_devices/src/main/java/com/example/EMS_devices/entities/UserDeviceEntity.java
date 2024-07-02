package com.example.EMS_devices.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "userdevices")
public class UserDeviceEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;



    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

//    public void setUser(UserEntity user) {
//        this.user = user;
//        if (user != null) {
//            user.getUserDevices().add(this);
//        }
//    }
//
//    public void setDevice(DeviceEntity device) {
//        this.device = device;
//        if (device != null) {
//            device.getUserDevices().add(this);
//        }
//    }

}

