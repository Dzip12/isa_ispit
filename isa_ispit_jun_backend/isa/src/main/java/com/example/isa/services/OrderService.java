package com.example.isa.services;

import com.example.isa.entities.Order;
import com.example.isa.mappers.OrderMapper;
import com.example.isa.models.CreateOrderModel;
import com.example.isa.models.OrderModel;
import com.example.isa.repositories.IOrderRepository;
import com.example.isa.repositories.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final IOrderRepository orderRepository;
    private final IUserRepository userRepository;

    public OrderModel create(CreateOrderModel model) {
        var user = userRepository.findById(model.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + model.getUserId()));

        var order = new Order();
        order.setUser(user);
        order.setTotalAmount(model.getTotalAmount());
        order.setStatus("PENDING");

        return OrderMapper.toModel(orderRepository.save(order));
    }

    public OrderModel pay(Integer id) {
        var order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        order.setStatus("PAID");

        return OrderMapper.toModel(orderRepository.save(order));
    }
}
