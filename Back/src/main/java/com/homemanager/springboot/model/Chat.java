package com.homemanager.springboot.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "chat")
public class Chat {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
  	private Integer id;
	@Column(name = "id_sender")
	private Integer idSender;
	@Column(name = "id_recipient")
	private Integer idRecipient;
	@Column(name = "message")
	private String message;
	@Column(name = "datetime")
	private LocalDateTime datetime;
	@Column(name = "read_or_not")
	private boolean read_or_not = false;

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getIdSender() {
		return idSender;
	}
	public void setIdSender(Integer idSender) {
		this.idSender = idSender;
	}
	public Integer getIdRecipient() {
		return idRecipient;
	}
	public void setIdRecipient(Integer idRecipient) {
		this.idRecipient = idRecipient;
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
