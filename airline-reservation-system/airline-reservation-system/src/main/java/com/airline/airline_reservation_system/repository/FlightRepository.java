package com.airline.airline_reservation_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.airline.airline_reservation_system.model.Flight;

public interface FlightRepository extends JpaRepository<Flight, Long> {
}
