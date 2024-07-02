package com.example.EMS_devices.entities;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "devices")
public class DeviceEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "deviceid", nullable = false)
    private UUID deviceID;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "max_consumption", nullable = false)
    private int max_consumption;



    public UUID getDeviceID() {
        return deviceID;
    }

    public void setDeviceID(UUID deviceID) {
        this.deviceID = deviceID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getMax_consumption() {
        return max_consumption;
    }

    public void setMax_consumption(int max_consumption) {
        this.max_consumption = max_consumption;
    }

}
