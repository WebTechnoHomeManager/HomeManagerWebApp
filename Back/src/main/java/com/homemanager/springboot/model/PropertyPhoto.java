package com.homemanager.springboot.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;


@Entity
@Table(name = "property_photo")
public class PropertyPhoto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String name;

	@Lob
	private byte[] data;

	private String type;

	private String property_id;

	public PropertyPhoto() {
	}

	public PropertyPhoto(String name, String type, byte[] data) {
		this.name = name;
		this.type = type;
		this.data = data;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getProperty_id() {
		return property_id;
	}

	public void setProperty_id(String property_id) {
		this.property_id = property_id;
	}
}
