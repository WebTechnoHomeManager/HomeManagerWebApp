package com.homemanager.springboot.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "property")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id", scope = Property.class)
public class Property {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	private Integer totalOccupancy;
	@Column(name = "latitude")
	private double latitude;
	@Column(name = "longitude")
	private double longitude;

	@ManyToOne
    @JoinColumn(name="owner_id")
    private User owner;

	@ManyToOne
    @JoinColumn(name="property_type_id")
    private Property_type propertyType;
	
	@OneToMany(mappedBy = "property")
    private Set<Reservation> reservations;
	
	// Liaison avec property_photo
	/*@OneToMany(mappedBy = "property")
    private Set<Reservation> reservations;*/

	@ManyToMany
	@JoinTable(
			  name = "property_services", 
			  joinColumns = @JoinColumn(name = "property_id"), 
			  inverseJoinColumns = @JoinColumn(name = "service_id"))
    Set<Service> propertyServices;
	
	@ManyToMany
	@JoinTable(
			  name = "property_restrictions", // = nom de la table dans la base
			  joinColumns = @JoinColumn(name = "property_id"), // champ dans la base
			  inverseJoinColumns = @JoinColumn(name = "restriction_id")) // champ dans la base
    Set<Restriction> propertyRestrictions;
	
	
	public Set<Reservation> getReservations() {
		return reservations;
	}
	public void setReservations(Set<Reservation> reservations) {
		this.reservations = reservations;
	}
	
	
	public Integer getTotalOccupancy() {
		return totalOccupancy;
	}
	public void setTotalOccupancy(Integer totalOccupancy) {
		this.totalOccupancy = totalOccupancy;
	}
	public Property_type getPropertyType() {
		return propertyType;
	}
	public void setPropertyType(Property_type propertyType) {
		this.propertyType = propertyType;
	}
	public Set<Service> getPropertyServices() {
		return propertyServices;
	}
	public void setPropertyServices(Set<Service> propertyServices) {
		this.propertyServices = propertyServices;
	}
	
	public Set<Restriction> getPropertyRestrictions() {
		return propertyRestrictions;
	}
	public void setPropertyRestrictions(Set<Restriction> propertyRestrictions) {
		this.propertyRestrictions = propertyRestrictions;
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
