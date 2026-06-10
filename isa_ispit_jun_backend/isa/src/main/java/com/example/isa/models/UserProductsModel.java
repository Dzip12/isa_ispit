package com.example.isa.models;

import lombok.Builder;
import lombok.Data;

import java.util.List;
@Data
@Builder
public class UserProductsModel {
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private List<OrderModel> orders;
}
