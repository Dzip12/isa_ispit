package com.example.isa.controllers;

import com.example.isa.models.LoginResponseModel;
import com.example.isa.models.LoginUserModel;
import com.example.isa.models.RefreshTokenModel;
import com.example.isa.models.RegisterUserModel;
import com.example.isa.models.UserModel;
import com.example.isa.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth/")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<UserModel> register(@RequestBody RegisterUserModel model) {
        return ResponseEntity.ok(authenticationService.signup(model));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseModel> authenticate(@RequestBody LoginUserModel model) {
        return ResponseEntity.ok(authenticationService.authenticate(model));
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseModel> refresh(@RequestBody RefreshTokenModel model) {
        return ResponseEntity.ok(authenticationService.refresh(model));
    }
}
