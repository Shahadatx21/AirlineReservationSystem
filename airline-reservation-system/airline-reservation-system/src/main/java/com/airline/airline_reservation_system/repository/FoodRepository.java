package com.airline.airline_reservation_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.airline.airline_reservation_system.model.Food;

public interface FoodRepository extends JpaRepository<Food, Long> {
}
