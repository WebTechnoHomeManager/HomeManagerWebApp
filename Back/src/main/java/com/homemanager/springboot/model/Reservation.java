package com.homemanager.springboot.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "reservation")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Reservation {

	@Id
	@GeneratedValue
  	private Integer id;

	@ManyToOne
    @JoinColumn(name="user_id")
    private User reservation_user;
	
	@ManyToOne
    @JoinColumn(name="property_id")
    private Property property_reservation;
	
	@Column(name = "start_date")
	private LocalDateTime start_date;
	@Column(name = "end_date")
	private LocalDateTime end_date;
	
	public Property getProperty_reservation() {
		return property_reservation;
	}
	public void setProperty_reservation(Property property_reservation) {
		this.property_reservation = property_reservation;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public User getReservation_user() {
		return reservation_user;
	}
	public void setReservation_user(User reservation_user) {
		this.reservation_user = reservation_user;
	}
	public LocalDateTime getStart_date() {
		return start_date;
	}
	public void setStart_date(LocalDateTime start_date) {
		this.start_date = start_date;
	}
	public LocalDateTime getEnd_date() {
		return end_date;
	}
	public void setEnd_date(LocalDateTime end_date) {
		this.end_date = end_date;
	}
}
