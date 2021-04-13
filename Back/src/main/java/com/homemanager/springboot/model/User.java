package com.homemanager.springboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {
	@Id
	@GeneratedValue
  private Integer id;
	@Column(name = "email")
  private String email;
	@Column(name = "password")
  private String password;
	@Column(name = "first_name")
  private String first_name;
	@Column(name = "last_name")
  private String last_name;
	@Column(name = "profile_picture_path")
  private String profile_picture_path;
  
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

public String getFirst_name() {
	return first_name;
}

public void setFirst_name(String first_name) {
	this.first_name = first_name;
}

public String getLast_name() {
	return last_name;
}

public void setLast_name(String last_name) {
	this.last_name = last_name;
}

public String getProfile_picture_path() {
	return profile_picture_path;
}

public void setProfile_picture_path(String profile_picture_path) {
	this.profile_picture_path = profile_picture_path;
}
  
  
  
}	