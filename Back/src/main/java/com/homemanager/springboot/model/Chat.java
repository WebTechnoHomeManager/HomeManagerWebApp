package com.homemanager.springboot.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "chat")
public class Chat {
	@Id
	@GeneratedValue
  private Integer id;
	@Column(name = "id_user1")
	  private Integer id_user1;
	@Column(name = "id_user2")
	  private Integer id_user2;
	@Column(name = "message")
	  private String message;
	@Column(name = "datetime")
	  private LocalDateTime datetime;
	@Column(name = "read_or_not")
	  private Boolean read_or_not;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getId_user1() {
		return id_user1;
	}
	public void setId_user1(Integer id_user1) {
		this.id_user1 = id_user1;
	}
	public Integer getId_user2() {
		return id_user2;
	}
	public void setId_user2(Integer id_user2) {
		this.id_user2 = id_user2;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public LocalDateTime getDatetime() {
		return datetime;
	}
	public void setDatetime(LocalDateTime datetime) {
		this.datetime = datetime;
	}
	public Boolean getRead_or_not() {
		return read_or_not;
	}
	public void setRead_or_not(Boolean read_or_not) {
		this.read_or_not = read_or_not;
	}
	
	
}
