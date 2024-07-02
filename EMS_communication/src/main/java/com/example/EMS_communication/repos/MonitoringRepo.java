package com.example.EMS_communication.repos;

import com.example.EMS_communication.entities.DeviceEntity;
import com.example.EMS_communication.entities.MonitoringEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;
import java.util.TimerTask;
import java.util.UUID;

public interface MonitoringRepo extends JpaRepository<MonitoringEntity, UUID> {

    //List<MonitoringEntity> findByDevice_DeviceIDAAndTimestampBetween(UUID deviceId, Timestamp timestamp);

    List<MonitoringEntity> findByDevice_DeviceIDAndAndTimestampBetween(UUID deviceId, Timestamp start, Timestamp end);
    List<MonitoringEntity> getMonitoringEntitiesByDeviceAndTimestampAfter(DeviceEntity device, Timestamp timestamp);
}
