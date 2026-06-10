package com.example.isa.repositories;

import com.example.isa.entities.UserProducts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserProductsRepository extends JpaRepository<UserProducts, Integer> {
}
