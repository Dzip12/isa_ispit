package com.example.isa.services;

import com.example.isa.constants.RoleConstants;
import com.example.isa.exceptions.user.UserAlreadyExistException;
import com.example.isa.mappers.UserMapper;
import com.example.isa.models.LoginResponseModel;
import com.example.isa.models.LoginUserModel;
import com.example.isa.models.RefreshTokenModel;
import com.example.isa.models.RegisterUserModel;
import com.example.isa.models.UserModel;
import com.example.isa.repositories.IRoleRepository;
import com.example.isa.repositories.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final IUserRepository userRepository;
    private final IRoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public UserModel signup(RegisterUserModel model) {
        var user = UserMapper.toEntity(model, passwordEncoder);


        var existingUser = userRepository.findByEmail(model.getEmail());

        if (existingUser.isPresent()) {
            throw new UserAlreadyExistException("User with email " + model.getEmail() + " already exists");
        }

        var role = roleRepository.findByName(RoleConstants.USER)
                .orElseThrow(() -> new RuntimeException("Role user not found"));
        user.getRoles().add(role);

        var savedUser = userRepository.save(user);

        return UserMapper.toModel(savedUser);

    }

    public LoginResponseModel authenticate(LoginUserModel model) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        model.getEmail(),
                        model.getPassword()
                )
        );

        var authenticatedUser = userRepository.findByEmail(model.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User with email " + model.getEmail() + " not found"));

        String jwtToken = jwtService.generateToken(authenticatedUser);
        String refreshToken = jwtService.generateRefreshToken(authenticatedUser);

        LoginResponseModel loginResponse = new LoginResponseModel();
        loginResponse.setToken(jwtToken);
        loginResponse.setRefreshToken(refreshToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());


        return loginResponse;
    }

    public LoginResponseModel refresh(RefreshTokenModel model) {
        var userEmail = jwtService.extractUsername(model.getRefreshToken());
        var authenticatedUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User with email " + userEmail + " not found"));

        if (!jwtService.isTokenValid(model.getRefreshToken(), authenticatedUser)) {
            throw new UsernameNotFoundException("Refresh token is not valid");
        }

        String jwtToken = jwtService.generateToken(authenticatedUser);
        String refreshToken = jwtService.generateRefreshToken(authenticatedUser);

        LoginResponseModel loginResponse = new LoginResponseModel();
        loginResponse.setToken(jwtToken);
        loginResponse.setRefreshToken(refreshToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return loginResponse;
    }
}
