package dev.fuskdev.userserv;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class UserServApplication {

	private static final Logger logger = LoggerFactory.getLogger(UserServApplication.class);

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(UserServApplication.class, args);
		logger.info("User Service running...");
	}

	@Bean
	CommandLineRunner runner() {

		return args -> {
			logger.info("User Service runner");
		};
	}

}
