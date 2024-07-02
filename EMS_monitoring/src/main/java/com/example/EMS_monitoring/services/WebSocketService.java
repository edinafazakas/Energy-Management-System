package com.example.EMS_monitoring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class WebSocketService {

    private SimpMessagingTemplate messagingTemplate;

    public WebSocketService(SimpMessagingTemplate messagingTemplate1) {
        this.messagingTemplate = messagingTemplate1;
    }

    public void pushNotification(UUID deviceId, String message) {
        // Assuming you have a topic for each device (replace "/topic/" with your actual topic structure)
        String topic = "/topic/device/" + deviceId;
        messagingTemplate.convertAndSend(topic, message);
    }
}
