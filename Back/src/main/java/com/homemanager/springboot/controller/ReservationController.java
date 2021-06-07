package com.homemanager.springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.ResponseEntity;

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
	
	@PostMapping("/reservations")
	public Reservation createReservation(@RequestBody Reservation reservation) {
		return reservationRepository.save(reservation);
	}
	 
	@GetMapping("/reservations/{id}")
	public Reservation findReservationById(@PathVariable Integer id) {
		Optional<Reservation> Reservation = reservationRepository.findById(id);
		return Reservation.get();
	}
	
	@PutMapping("/reservations/{id}")
	public ResponseEntity<Reservation> updateReservation(@PathVariable Integer id, @RequestBody Reservation reservationDetails){
		Reservation reservation = reservationRepository.findById(id)
				.orElseThrow();
		
		reservation.setStart_date(reservationDetails.getStart_date());
		reservation.setEnd_date(reservationDetails.getEnd_date());
		reservation.setProperty(reservationDetails.getProperty());
		
		Reservation updatedReservation = reservationRepository.save(reservation);
		return ResponseEntity.ok(updatedReservation);
	}
		
	@DeleteMapping("/reservations/{id}")
	public String deleteReservation(@PathVariable Integer id) throws JSONException{
		Reservation reservation = reservationRepository.findById(id)
				.orElseThrow();
		
		reservationRepository.delete(reservation);

		JSONObject response = new JSONObject();
		response.put("deletedId", id);
		return response.toString();
	}
	
	@GetMapping("/reservations/user/{id}")
	public List<Reservation> findByReservationUser(@PathVariable Integer id) {
		return reservationRepository.findByReservationUser_Id(id);
	}
}
