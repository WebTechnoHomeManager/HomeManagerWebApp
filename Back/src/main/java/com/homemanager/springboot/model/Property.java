package com.homemanager.springboot.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "property")
public class Property {
	@Id
	@GeneratedValue
	private Integer id;
	@Column(name = "title")
	private String title;
	@Column(name = "description")
	private String description;
	@Column(name = "address")
    private String address;
	@Column(name = "city")
	private String city;
	@Column(name = "total_occupancy")
	private Integer total_occupancy;
	@Column(name = "latitude")
	private double latitude;
	@Column(name = "longitude")
	private double longitude;
	
	//@Column(name = "owner_id")
	//private Integer owner_id;
	@ManyToOne
    @JoinColumn(name="owner_id")
    private User owner;
	
	//@Column(name = "property_type_id")
	//private int property_type_id;
	@ManyToOne
    @JoinColumn(name="property_type_id")
    private Property_type property_type;
	
	@OneToMany(mappedBy = "property_reservation")
    private Set<Reservation> reservations;
	
	// Liaison avec property_photo
	/*@OneToMany(mappedBy = "property_reservation")
    private Set<Reservation> reservations;*/

	@ManyToMany
	@JoinTable(
			  name = "property_services", 
			  joinColumns = @JoinColumn(name = "property_id"), 
			  inverseJoinColumns = @JoinColumn(name = "service_id"))
    Set<Service> property_services;
	
	@ManyToMany
	@JoinTable(
			  name = "property_constraints", 
			  joinColumns = @JoinColumn(name = "property_id"), 
			  inverseJoinColumns = @JoinColumn(name = "constraint_id"))
    Set<Restriction> property_constraints;
	
	
	public Set<Restriction> getProperty_constraints() {
		return property_constraints;
	}
	public void setProperty_constraints(Set<Restriction> property_constraints) {
		this.property_constraints = property_constraints;
	}
	//Getters and Setters
	public Set<Reservation> getReservations() {
		return reservations;
	}
	public void setReservations(Set<Reservation> reservations) {
		this.reservations = reservations;
	}
	
	public Set<Service> getProperty_services() {
		return property_services;
	}
	public void setProperty_services(Set<Service> property_services) {
		this.property_services = property_services;
	}
	public Property_type getProperty_type() {
		return property_type;
	}
	public void setProperty_type(Property_type property_type_id) {
		this.property_type = property_type_id;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public Integer getTotal_occupancy() {
		return total_occupancy;
	}
	public void setTotal_occupancy(Integer total_occupancy) {
		this.total_occupancy = total_occupancy;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public User getOwner() {
		return owner;
	}
	public void setOwner(User owner) {
		this.owner = owner;
	}
}
