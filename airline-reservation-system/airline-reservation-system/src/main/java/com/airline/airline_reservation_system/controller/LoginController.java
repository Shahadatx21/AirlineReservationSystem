package com.airline.airline_reservation_system.controller;

import com.airline.airline_reservation_system.model.User;
import com.airline.airline_reservation_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @PostMapping("/login")
    public String login(@RequestParam String username,
                        @RequestParam String password,
                        Model model) {

        User user = userRepository.findByUsernameAndPassword(username, password);

        if (user == null) {
            model.addAttribute("error", "Invalid username or password");
            return "login";
        }

        return "redirect:/admin/bookings";
    }
}
