package com.homemanager.springboot.repository;

import org.springframework.data.repository.CrudRepository;

import com.homemanager.springboot.model.Reservation;

public interface ReservationRepository extends CrudRepository<Reservation, Integer> {

}
