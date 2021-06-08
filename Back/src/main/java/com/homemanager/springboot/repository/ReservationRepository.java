package com.homemanager.springboot.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.homemanager.springboot.model.Reservation;

public interface ReservationRepository extends CrudRepository<Reservation, Integer> {
	
	// list all reservations from a specific user
	public List<Reservation> findByReservationUser_Id(@Param("id") int id); 
	
	public List<Reservation> findByProperty_Id(@Param("id") int id); 

}
