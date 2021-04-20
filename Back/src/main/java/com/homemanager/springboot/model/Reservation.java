package com.homemanager.springboot.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Reservation {
	@Id
	@GeneratedValue
  private Integer id;
	@Column(name = "user_id")
	  private Integer user_id;
	@Column(name = "property_id")
	  private Integer property_id;
	@Column(name = "start_date")
	  private LocalDateTime start_date;
	@Column(name = "end_date")
	  private LocalDateTime end_date;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getUser_id() {
		return user_id;
	}
	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}
	public Integer getProperty_id() {
		return property_id;
	}
	public void setProperty_id(Integer property_id) {
		this.property_id = property_id;
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
