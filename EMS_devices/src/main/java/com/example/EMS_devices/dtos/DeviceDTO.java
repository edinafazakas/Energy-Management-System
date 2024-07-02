package com.example.EMS_devices.dtos;

import jakarta.persistence.Column;

public class DeviceDTO {
    private String description;
    private String address;
    private int max_consumption;

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
