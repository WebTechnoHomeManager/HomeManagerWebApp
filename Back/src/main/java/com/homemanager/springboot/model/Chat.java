package com.homemanager.springboot.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "chat")
public class Chat {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
  	private Integer id;

	@ManyToOne
    @JoinColumn(name="id_sender")
    private User sender;

	@ManyToOne
    @JoinColumn(name="id_recipient")
    private User recipient;
	
	@Column(name = "message")
	private String message;
	@Column(name = "datetime")
	private Date datetime;
	@Column(name = "read_or_not")
	private boolean read_or_not = false;

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public User getSender() {
		return sender;
	}
	public void setSender(User sender) {
		this.sender = sender;
	}
	public User getRecipient() {
		return recipient;
	}
	public void setRecipient(User recipient) {
		this.recipient = recipient;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Date getDatetime() {
		return datetime;
	}
	public void setDatetime(Date datetime) {
		this.datetime = datetime;
	}
	public Boolean getRead_or_not() {
		return read_or_not;
	}
	public void setRead_or_not(Boolean read_or_not) {
		this.read_or_not = read_or_not;
	}
}
