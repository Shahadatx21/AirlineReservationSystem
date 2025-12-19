package com.airline.airline_reservation_system.controller;

import com.airline.airline_reservation_system.model.Booking;
import com.airline.airline_reservation_system.model.Flight;
import com.airline.airline_reservation_system.model.Food;
import com.airline.airline_reservation_system.repository.BookingRepository;
import com.airline.airline_reservation_system.repository.FlightRepository;
import com.airline.airline_reservation_system.repository.FoodRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class BookingController {


    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private FoodRepository foodRepository;

    // SEARCH FLIGHTS
    @GetMapping("/search")
    public String searchFlights(Model model) {
        model.addAttribute("flights", flightRepository.findAll());
        model.addAttribute("foods", foodRepository.findAll());
        return "search-flights";
    }

    // BOOK FLIGHT
    @PostMapping("/book")
    public String bookFlight(
            @RequestParam String passengerName,
            @RequestParam Long flightId,
            @RequestParam int seats,
            @RequestParam(required = false) Long foodId,
            Model model) {

        Flight flight = flightRepository.findById(flightId).orElse(null);

        if (flight == null || flight.getTotalSeats() < seats) {
            model.addAttribute("error", "Not enough seats available");
            return "result";
        }

        flight.setTotalSeats(flight.getTotalSeats() - seats);
        flightRepository.save(flight);

        Booking booking = new Booking();
        booking.setPassengerName(passengerName);
        booking.setSeatsBooked(seats);
        booking.setFlight(flight);

        double totalPrice = flight.getPrice() * seats;

        if (foodId != null) {
            Food food = foodRepository.findById(foodId).orElse(null);
            if (food != null) {
                booking.setFoodItem(food.getName());
                booking.setFoodPrice(food.getPrice());
                totalPrice += food.getPrice();
            } else {
                booking.setFoodItem("None");
                booking.setFoodPrice(0);
            }
        } else {
            booking.setFoodItem("None");
            booking.setFoodPrice(0);
        }

        booking.setTotalPrice(totalPrice);
        bookingRepository.save(booking);

        model.addAttribute("booking", booking);
        model.addAttribute("flight", flight);

        return "result";
    }

    // HISTORY
    @GetMapping("/history")
    public String history(Model model) {
        model.addAttribute("bookings", bookingRepository.findAll());
        return "history";
    }

    // CANCEL BOOKING
    @GetMapping("/cancel/{id}")
    public String cancelBooking(@PathVariable Long id) {
        Booking b = bookingRepository.findById(id).orElse(null);

        if (b != null) {
            Flight f = b.getFlight();
            f.setTotalSeats(f.getTotalSeats() + b.getSeatsBooked());
            flightRepository.save(f);

            bookingRepository.deleteById(id);
        }

        return "redirect:/booking/history";
    }
}
