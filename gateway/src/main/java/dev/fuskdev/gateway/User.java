package dev.fuskdev.gateway;

import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON;


public record User(Integer id,
                   @NotNull String firstName,
                   @NotNull String lastName,
                   LocalDateTime birthDate,
                   @NotNull Gender gender) {
}
