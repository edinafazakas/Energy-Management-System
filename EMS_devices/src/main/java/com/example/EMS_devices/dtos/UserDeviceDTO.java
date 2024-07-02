package com.example.EMS_devices.dtos;

import com.example.EMS_devices.entities.DeviceEntity;
import com.example.EMS_devices.entities.UserEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.UUID;

public class UserDeviceDTO {

    private UUID id;
    private UUID userid;

    private UUID deviceid;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUserid() {
        return userid;
    }

    public void setUserid(UUID userid) {
        this.userid = userid;
    }

    public UUID getDeviceid() {
        return deviceid;
    }

    public void setDeviceid(UUID deviceid) {
        this.deviceid = deviceid;
    }
}
