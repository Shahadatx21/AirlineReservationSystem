package com.airline.airline_reservation_system.controller;

import com.airline.airline_reservation_system.model.Booking;
import com.airline.airline_reservation_system.model.Flight;
import com.airline.airline_reservation_system.repository.BookingRepository;
import com.airline.airline_reservation_system.repository.FlightRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminFlightController {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/add-flight")
    public String addFlightPage() {
        return "add-flight";
    }

    @PostMapping("/add-flight")
    public String saveFlight(Flight flight) {
        flightRepository.save(flight);
        return "redirect:/admin/bookings";
    }

    @GetMapping("/bookings")
    public String viewBookings(Model model) {
        List<Booking> bookings = bookingRepository.findAll();
        model.addAttribute("bookings", bookings);
        return "admin-bookings";
    }

    @GetMapping("/cancel")
    public String adminCancel(@RequestParam Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId).orElse(null);

        if (booking != null) {
            // restore seats
            Flight flight = booking.getFlight();
            flight.setTotalSeats(flight.getTotalSeats() + booking.getSeatsBooked());
            flightRepository.save(flight);

            bookingRepository.delete(booking);
        }

        return "redirect:/admin/bookings";
    }
}
