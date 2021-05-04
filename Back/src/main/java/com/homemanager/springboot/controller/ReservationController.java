package com.homemanager.springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;

import com.homemanager.springboot.model.Reservation;
import com.homemanager.springboot.repository.ReservationRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class ReservationController {
	@Autowired// This means to get the bean called propertyRepository
    // Which is auto-generated by Spring, we will use it to handle the data
	private ReservationRepository reservationRepository;
	
	@GetMapping(path="/reservations")
	  public @ResponseBody Iterable<Reservation> getAllReservations() {
	    // This returns a JSON or XML with the users
	    return reservationRepository.findAll();
	  }
}