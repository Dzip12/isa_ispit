package com.example.isa.mappers;

import com.example.isa.entities.Product;
import com.example.isa.models.ProductModel;

import java.util.ArrayList;
import java.util.List;

public class ProductMapper {
    public static ProductModel toModel(Product entity) {
        return ProductModel.builder()
                .id(entity.getId())
                .name(entity.getName())
                .price(entity.getPrice())
                .size(entity.getSize())
                .imageUrl(entity.getImageUrl())
                .build();
    }

    public static List<ProductModel> toModelList(List<Product> entities) {
        var list = new ArrayList<ProductModel>();

        for (var entity : entities) {
            list.add(toModel(entity));
        }
        return list;
    }
}
