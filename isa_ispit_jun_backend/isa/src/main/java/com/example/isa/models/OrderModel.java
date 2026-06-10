package com.example.isa.models;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class OrderModel {
    private int id;
    private BigDecimal totalAmount;
    private String status;
}
