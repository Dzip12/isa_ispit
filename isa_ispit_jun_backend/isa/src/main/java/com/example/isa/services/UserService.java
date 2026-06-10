package com.example.isa.services;

import com.example.isa.mappers.UserMapper;
import com.example.isa.mappers.UserProductsMapper;
import com.example.isa.models.UserModel;
import com.example.isa.models.UserPageModel;
import com.example.isa.models.UserProductsModel;
import com.example.isa.repositories.IUserProductsRepository;
import com.example.isa.repositories.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final IUserRepository userRepository;
    private final IUserProductsRepository userProductRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserModel> findAll() {
        var result = userRepository.findAll();
        return UserMapper.toModelList(result);
    }

    @Override
    public UserPageModel findPagedList(PageRequest pageRequest) {
        var result = userRepository.findAll(pageRequest);
        return UserMapper.toModelPagedList(result);
    }

    @Override
    public UserModel create(UserModel model) {
        var entity = UserMapper.toEntity(model);
        entity.setPassword(passwordEncoder.encode(model.getPassword()));
        return UserMapper.toModel(userRepository.save(entity));
    }

    @Override
    public UserModel update(UserModel model) {
        var existing = userRepository.findById(model.getId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + model.getId()));

        existing.setFirstName(model.getFirstName());
        existing.setLastName(model.getLastName());
        existing.setEmail(model.getEmail());

        return UserMapper.toModel(userRepository.save(existing));
    }

    @Override
    public void delete(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<UserProductsModel> findUserProductsAll() {
        var result = userProductRepository.findAll();
        return UserProductsMapper.toModelList(result);
    }
}
