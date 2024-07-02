package com.example.EMS_monitoring.message;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;

public class MessageBroker {
    public static final String QUEUE_NAME = "energy-consumption-queue";

    @Bean
    public Queue energyConsumptionQueue() {
        return new Queue(QUEUE_NAME, false);
    }

//    @Bean
//    public Queue hourlyConsumptionQueue() {
//        return new Queue("hourly-consumption-queue", false);
//    }
}