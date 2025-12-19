package com.airline.airline_reservation_system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/flights")
public class FlightController {

    @GetMapping
    public String flights() {
        return "search-flights";  // FIXED
    }
}
