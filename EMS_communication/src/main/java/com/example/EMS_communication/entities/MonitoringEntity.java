package com.example.EMS_communication.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name="monitoring")
public class MonitoringEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "timestamp")
    private Timestamp timestamp;

    @Column(name = "measurement_value")
    private Double measurement_value;

    @ManyToOne
    @JoinColumn(name = "deviceid")
    private DeviceEntity device;


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public Double getMeasurement_value() {
        return measurement_value;
    }

    public void setMeasurement_value(Double measurement_value) {
        this.measurement_value = measurement_value;
    }

    public DeviceEntity getDevice() {
        return device;
    }

    public void setDevice(DeviceEntity device) {
        this.device = device;
    }

}

