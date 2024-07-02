package com.example.EMS_monitoring.configuration;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class RabbitConfiguration {

    @Bean
    public Queue energyConsumptionQueue() {
        return new Queue("energy-consumption-queue", true);
    }
//    @Bean
//    public Queue hourlyConsumptionQueue() {
//        return new Queue("hourly-consumption-queue", true);
//    }
}
