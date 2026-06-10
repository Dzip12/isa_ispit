package com.example.isa.models;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateOrderModel {
    private Integer userId;
    private BigDecimal totalAmount;
}
