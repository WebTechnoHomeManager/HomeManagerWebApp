package com.homemanager.springboot.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
  	private Integer id;
	@Column(name = "email")
  	private String email;
	@Column(name = "password")
  	private String password;
	@Column(name = "first_name")
  	private String firstName;
	@Column(name = "last_name")
  	private String lastName;
	@Column(name = "tel")
	private String tel;
	@Column(name = "date_birth")
	private Date dateBirth;
	@Column(name = "date_registration")
	private Date dateRegistration;
	@Column(name = "type")
	private String type;
	@Column(name = "profile_picture_path")
  	private String profilePicturePath;
	
	@OneToMany(mappedBy = "reservation_user")
    private Set<Reservation> reservations;

	public boolean isPasswordRight(String inputPassword) {
		return inputPassword.equals(this.password);
	}
	
	public Integer getId() {
	    return id;
	}

	public void setId(Integer id) {
	    this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getFirstName() {
		return firstName;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public Date getDateBirth() {
		return dateBirth;
	}

	public void setDateBirth(Date dateBirth) {
		this.dateBirth = dateBirth;
	}

	public Date getDateRegistration() {
		return dateRegistration;
	}

	public void setDateRegistration(Date dateRegistration) {
		this.dateRegistration = dateRegistration;
	}
	
	public String getProfilePicturePath() {
		return profilePicturePath;
	}
	
	public void setProfilePicturePath(String profilePicturePath) {
		this.profilePicturePath = profilePicturePath;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "{\"id\": \"" + id + "\", \"email\": \"" + email + "\", \"password\": \"" + password
				+ "\", \"firstName\": \"" + firstName + "\", \"lastName\": \"" + lastName + "\", \"tel\": \"" + tel
				+ "\", \"dateBirth\": \"" + dateBirth + "\", \"dateRegistration\": \"" + dateRegistration
				+ "\", \"type\": \"" + type + "\", \"profilePicturePath\": \"" + profilePicturePath
				+ "\", \"reservations\": \"" + reservations + "\"}";
	}
	
}	
