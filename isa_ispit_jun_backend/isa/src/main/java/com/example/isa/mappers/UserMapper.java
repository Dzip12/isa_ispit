package com.example.isa.mappers;

import com.example.isa.entities.User;
import com.example.isa.entities.UserProducts;
import com.example.isa.models.RegisterUserModel;
import com.example.isa.models.UserModel;
import com.example.isa.models.UserPageModel;
import com.example.isa.models.UserProductsModel;
import org.springframework.data.domain.Page;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

public class UserMapper {
    public static User toEntity(UserModel model) {
        User user = new User();
        user.setId(model.getId() == 0 ? null : model.getId());
        user.setFirstName(model.getFirstName());
        user.setLastName(model.getLastName());
        user.setEmail(model.getEmail());
        return user;
    }

    public static User toEntity(RegisterUserModel model, PasswordEncoder passwordEncoder) {
        User user = new User();
        user.setFirstName("");
        user.setLastName("");
        user.setEmail(model.getEmail());
        user.setPassword(passwordEncoder.encode(model.getPassword()));
        return user;
    }

    public static UserModel toModel(User entity){
        return UserModel.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .build();
    }

    public static List<UserModel> toModelList(List<User> entities){
        var list = new ArrayList<UserModel>();
        for (var entity : entities) {
            list.add(toModel(entity));
        }
        return list;
    }

    public static UserPageModel toModelPagedList(Page<User> pageEntity){
        return UserPageModel.builder()
                .users(toModelList(pageEntity.getContent()))
                .totalPages(pageEntity.getTotalPages())
                .totalElements(pageEntity.getTotalElements())
                .build();
    }

    public static UserProductsModel toModel(UserProducts entity){
        return UserProductsModel.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .orders(OrderMapper.toModelList(entity.getOrders()))
                .build();
    }

    public static List<UserProductsModel> toModelUserProductsList(List<UserProducts> entities){
        var list = new ArrayList<UserProductsModel>();
        for (var entity : entities) {
            list.add(toModel(entity));
        }
        return list;
    }
}
