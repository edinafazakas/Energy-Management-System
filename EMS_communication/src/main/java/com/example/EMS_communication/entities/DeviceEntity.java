package com.example.EMS_communication.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="devices")
public class DeviceEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "deviceid", nullable = false)
    private UUID deviceID;

//    @Column(name = "max_consumption")
//    private int max_consumption;

    @Column(name = "last_hour_energy_consumption")
    private Double last_hour_energy_consumption;


    public UUID getDeviceID() {
        return deviceID;
    }

    public void setDeviceID(UUID deviceID) {
        this.deviceID = deviceID;
    }

//    public int getMax_consumption() {
//        return max_consumption;
//    }
//
//    public void setMax_consumption(int max_consumption) {
//        this.max_consumption = max_consumption;
//    }

    public Double getLast_hour_energy_consumption() {
        return last_hour_energy_consumption;
    }

    public void setLast_hour_energy_consumption(Double last_hour_energy_consumption) {
        this.last_hour_energy_consumption = last_hour_energy_consumption;
    }
}
