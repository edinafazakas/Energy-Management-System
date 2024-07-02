package com.example.EMS_communication.controllers;

import com.example.EMS_communication.entities.DeviceEntity;
import com.example.EMS_communication.entities.MonitoringEntity;
import com.example.EMS_communication.services.DeviceService;
import com.example.EMS_communication.services.MonitoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
public class MonitoringController {

    @Autowired
    private final MonitoringService monitoringService;

    @Autowired
    private final DeviceService deviceService;

    public MonitoringController(MonitoringService monitoringService, DeviceService deviceService) {
        this.monitoringService = monitoringService;
        this.deviceService = deviceService;
    }

    @GetMapping("/total-for-day")
    public ResponseEntity<Double> getTotalEnergyConsumptionForDay(
            @RequestParam UUID deviceId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        Double totalEnergyConsumption = monitoringService.calculateTotalEnergyConsumptionForDay(deviceId, date);
        return ResponseEntity.ok(totalEnergyConsumption);
    }

    @GetMapping("/daily/{deviceId}/{date}")
    public ResponseEntity<List<MonitoringEntity>> getDailyEnergyConsumption(
            @PathVariable UUID deviceId,
            @PathVariable String date
    ) {
        LocalDate localDate = LocalDate.parse(date);
        List<MonitoringEntity> energyConsumptionData = monitoringService.getEnergyConsumptionForDay(deviceId, localDate);
        return ResponseEntity.ok(energyConsumptionData);
    }

    @GetMapping("/getDeviceIds")
    public List<DeviceEntity> getDevices() {
        return deviceService.getAllDevices();
    }
}
