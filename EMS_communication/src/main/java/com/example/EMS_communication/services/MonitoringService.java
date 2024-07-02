package com.example.EMS_communication.services;

import com.example.EMS_communication.entities.DeviceEntity;
import com.example.EMS_communication.entities.MonitoringEntity;
import com.example.EMS_communication.repos.DeviceRepo;
import com.example.EMS_communication.repos.MonitoringRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLSyntaxErrorException;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class MonitoringService {

    @Autowired
    private MonitoringRepo monitoringRepo;
    @Autowired
    private DeviceService deviceService;

    @Autowired
    public MonitoringService(MonitoringRepo monitoringRepository, DeviceService deviceService) {
        this.monitoringRepo = monitoringRepository;
        this.deviceService = deviceService;
    }

    public List<MonitoringEntity> getByDevicesTimestamp(DeviceEntity device, Timestamp timestamp){
        return monitoringRepo.getMonitoringEntitiesByDeviceAndTimestampAfter(device, timestamp);
    }

    public MonitoringEntity saveSimulation(UUID id, UUID deviceId, Double measurementValue, Timestamp timestamp) {
        MonitoringEntity monitoringEntity = new MonitoringEntity();
        monitoringEntity.setId(id);
        monitoringEntity.setTimestamp(timestamp);
        monitoringEntity.setMeasurement_value(measurementValue);
        monitoringEntity.setDevice(deviceService.getDeviceById(deviceId));
        monitoringRepo.save(monitoringEntity);
        calculateHourlyEnergyConsumption(deviceId);
        return monitoringEntity;
    }

    private void calculateHourlyEnergyConsumption(UUID deviceId) {
        DeviceEntity device = deviceService.getDeviceById(deviceId);

        Instant oneHourAgo = Instant.now().minusSeconds(3600);
        List<MonitoringEntity> lastHourData = getByDevicesTimestamp(
                device,
                Timestamp.from(oneHourAgo)
        );

        double sum = lastHourData.stream()
                .mapToDouble(MonitoringEntity::getMeasurement_value)
                .sum();

        device.setLast_hour_energy_consumption(sum);
        deviceService.saveDevice(device);
    }

    public List<MonitoringEntity> getEnergyConsumptionForDay(UUID deviceId, LocalDate date) {
        Timestamp startOfDay = Timestamp.valueOf(LocalDateTime.of(date, LocalDateTime.MIN.toLocalTime()));
        Timestamp endOfDay = Timestamp.valueOf(LocalDateTime.of(date, LocalDateTime.MAX.toLocalTime()));
        return monitoringRepo.findByDevice_DeviceIDAndAndTimestampBetween(deviceId, startOfDay, endOfDay);
    }


    public Double calculateTotalEnergyConsumptionForDay(UUID deviceId, LocalDate date) {
        Timestamp startOfDay = Timestamp.valueOf(LocalDateTime.of(date, LocalDateTime.MIN.toLocalTime()));
        Timestamp endOfDay = Timestamp.valueOf(LocalDateTime.of(date, LocalDateTime.MAX.toLocalTime()));
        List<MonitoringEntity> monitoringData = monitoringRepo.findByDevice_DeviceIDAndAndTimestampBetween(deviceId, startOfDay, endOfDay);

        return monitoringData.stream().mapToDouble(MonitoringEntity::getMeasurement_value).sum();
    }

}
