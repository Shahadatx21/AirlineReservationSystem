package com.airline.airline_reservation_system.controller;

import com.airline.airline_reservation_system.repository.FlightRepository;
import com.airline.airline_reservation_system.repository.FoodRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private FoodRepository foodRepository;

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("flights", flightRepository.findAll());
        model.addAttribute("foods", foodRepository.findAll());
        return "index";
    }
}
