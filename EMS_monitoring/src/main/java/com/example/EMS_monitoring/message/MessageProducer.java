package com.example.EMS_monitoring.message;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Component
public class MessageProducer {

    private final RabbitTemplate rabbitTemplate;
    private int lastProcessedLineIndex = 0;
    private UUID initialDeviceId;

    @Autowired
    public MessageProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
        //this.initialDeviceId = getRandomDeviceIDFromDevices();
    }

    public void startTask(String deviceID) {
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(() -> sendMessage(UUID.fromString(deviceID)), 0, 100, TimeUnit.SECONDS);
    }

    public void sendMessage(UUID deviceID) {
        try (InputStream inputStream = getClass().getResourceAsStream("/sensor.csv")) {
            if (inputStream != null) {
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
                    String line;
                    int currentIndex = 0;

                    while (currentIndex < lastProcessedLineIndex && (line = reader.readLine()) != null) {
                        currentIndex++;
                    }

                    if ((line = reader.readLine()) != null) {
                        sendEnergyConsumptionMessage(deviceID, UUID.randomUUID().toString(), Double.parseDouble(line));
                        lastProcessedLineIndex = currentIndex + 1;
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else {
                System.out.println("sensor.csv not found in resources.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void sendEnergyConsumptionMessage(UUID deviceId, String messageId, double measurement_value) {

        String message = String.format("{\"id\": \"%s\", \"deviceId\": \"%s\", \"measurement_value\": \"%f\", \"timestamp\": \"%s\"}", messageId, deviceId, measurement_value, Instant.now());

        System.out.println(message);
        rabbitTemplate.convertAndSend("energy-consumption-queue", message);
    }
}
