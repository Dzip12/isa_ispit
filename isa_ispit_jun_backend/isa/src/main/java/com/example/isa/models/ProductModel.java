package com.example.isa.models;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class ProductModel {
    private int id;
    private String name;
    private BigDecimal price;
    private String size;
    private String imageUrl;
}
