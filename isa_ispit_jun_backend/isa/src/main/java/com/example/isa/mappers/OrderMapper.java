package com.example.isa.mappers;

import com.example.isa.entities.Order;
import com.example.isa.models.OrderModel;

import java.util.ArrayList;
import java.util.List;

public class OrderMapper {
    public static OrderModel toModel(Order entity) {
        return OrderModel.builder()
                .id(entity.getId())
                .totalAmount(entity.getTotalAmount())
                .status(entity.getStatus())
                .build();
    }

    public static List<OrderModel> toModelList(List<Order> entities) {
        var list = new ArrayList<OrderModel>();

        for (var entity : entities) {
            list.add(toModel(entity));
        }

        return list;
    }
}
