package dev.fuskdev.userserv.user;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;


public record User(
        Integer id,
        @NotNull String firstName,
        @NotNull String lastName,
        LocalDateTime birthDate,
        @NotNull Gender gender) {
}
