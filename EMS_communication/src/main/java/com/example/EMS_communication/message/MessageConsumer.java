package com.example.EMS_communication.message;

import com.example.EMS_communication.entities.DeviceEntity;
import com.example.EMS_communication.entities.MonitoringEntity;
import com.example.EMS_communication.services.DeviceService;
import com.example.EMS_communication.services.MonitoringService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Component
public class MessageConsumer {

    @Autowired
    private final MonitoringService monitoringService;
    @Autowired
    private final DeviceService deviceService;

    @Autowired
    public MessageConsumer(MonitoringService monitoringService, DeviceService deviceService) {
        this.monitoringService = monitoringService;
        this.deviceService = deviceService;
    }

    @RabbitListener(queues = "energy-consumption-queue")
    public void receiveMessage(String message) {
        System.out.println("Received message: " + message);

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Map messageMap = objectMapper.readValue(message, Map.class);
            UUID messageId = UUID.fromString((String) messageMap.get("id"));
            UUID deviceId = UUID.fromString((String) messageMap.get("deviceId"));
            String measurementValueStr = (String) messageMap.get("measurement_value");
            double measurementValue = Double.parseDouble(measurementValueStr.replace(",", "."));
            Instant timestamp = Instant.parse((String) messageMap.get("timestamp"));

            monitoringService.saveSimulation(messageId, deviceId, measurementValue, Timestamp.from(timestamp));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
