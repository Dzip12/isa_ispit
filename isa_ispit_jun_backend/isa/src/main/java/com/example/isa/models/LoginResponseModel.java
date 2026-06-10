package com.example.isa.models;

import lombok.Data;

@Data
public class LoginResponseModel {
    private String token;
    private String refreshToken;
    private long expiresIn;
}
