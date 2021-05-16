package com.homemanager.springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;

import com.homemanager.springboot.model.Reservation;
import com.homemanager.springboot.repository.ReservationRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ReservationController {

	@Autowired
	private ReservationRepository reservationRepository;
	
	@GetMapping(path="/reservations")
	public @ResponseBody Iterable<Reservation> getAllReservations() {
		return reservationRepository.findAll();
	}
}
