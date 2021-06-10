package com.homemanager.springboot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.homemanager.springboot.model.Property;
import com.homemanager.springboot.model.PropertyPhoto;

public interface PropertyRepository extends CrudRepository<Property, Integer> {

	@Query("SELECT P "
			+ "FROM Property P "
			+ "LEFT JOIN Reservation R ON P.id = R.property "
			+ "WHERE P.city in (:loca)"
			)
	public List<Property> getPropertyBy(@Param("loca") List<String> locations);

	// list all properties from a specific user
	public List<Property> findByOwner_Id(@Param("id") int id); 
	
	public Property findById(int id);
}
