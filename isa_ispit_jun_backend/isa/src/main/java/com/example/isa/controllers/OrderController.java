package com.example.isa.controllers;

import com.example.isa.models.CreateOrderModel;
import com.example.isa.models.OrderModel;
import com.example.isa.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("order")
@RequiredArgsConstructor
@CrossOrigin("*")
public class OrderController {
    private final OrderService orderService;

    @PostMapping("create")
    public ResponseEntity<OrderModel> create(@RequestBody CreateOrderModel model) {
        return new ResponseEntity<>(orderService.create(model), HttpStatus.CREATED);
    }

    @PutMapping("pay/{id}")
    public ResponseEntity<OrderModel> pay(@PathVariable Integer id) {
        return new ResponseEntity<>(orderService.pay(id), HttpStatus.OK);
    }
}
