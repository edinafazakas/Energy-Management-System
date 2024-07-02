package com.example.EMS_monitoring;

import com.example.EMS_monitoring.message.MessageProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class EmsMonitoringApplication {

	@Autowired
	private MessageProducer messageProducer;

	@EventListener(ApplicationReadyEvent.class)
	public void testMessaging() {
		messageProducer.startTask("ab9a1b38-6df9-4d79-95fd-ef024407e062");
	}
	public static void main(String[] args) {
		SpringApplication.run(EmsMonitoringApplication.class, args);
	}



}
