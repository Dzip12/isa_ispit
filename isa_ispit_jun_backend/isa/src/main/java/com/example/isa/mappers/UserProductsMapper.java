package com.example.isa.mappers;

import com.example.isa.entities.UserProducts;
import com.example.isa.models.UserProductsModel;

import java.util.ArrayList;
import java.util.List;

public class UserProductsMapper {

    public static UserProductsModel toModel(UserProducts entity){
        return UserProductsModel.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .orders(OrderMapper.toModelList(entity.getOrders()))
                .build();
    }

    public static List<UserProductsModel> toModelList(List<UserProducts> entities){
        var list = new ArrayList<UserProductsModel>();
        for (var entity : entities) {
            list.add(toModel(entity));
        }
        return list;
    }
}
