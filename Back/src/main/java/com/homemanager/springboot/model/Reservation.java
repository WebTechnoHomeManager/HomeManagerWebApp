package com.homemanager.springboot.model;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "reservation")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id", scope = Reservation.class)
public class Reservation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
  	private Integer id;

	@ManyToOne
    @JoinColumn(name="user_id")
    private User reservationUser;
	
	@ManyToOne
    @JoinColumn(name="property_id")
    private Property property;
	
	@Column(name = "start_date")
	private Date start_date;
	@Column(name = "end_date")
	private Date end_date;
	
	public Property getProperty() {
		return property;
	}
	public void setProperty(Property property) {
		this.property = property;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	public User getReservationUser() {
		return reservationUser;
	}
	public void setReservationUser(User reservationUser) {
		this.reservationUser = reservationUser;
	}
	public Date getStart_date() {
		return start_date;
	}
	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}
	public Date getEnd_date() {
		return end_date;
	}
	public void setEnd_date(Date end_date) {
		this.end_date = end_date;
	}
}
