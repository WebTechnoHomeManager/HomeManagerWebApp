package com.homemanager.springboot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.homemanager.springboot.model.Property;

public interface PropertyRepository extends CrudRepository<Property, Integer> {

	@Query("SELECT P "
			+ "FROM Property P "
			+ "LEFT JOIN Reservation R ON P.id = R.property_reservation "
			+ "WHERE P.city in (:loca)"
			)
	public List<Property> getPropertyBy(@Param("loca") List<String> locations);

	// list all properties from a specific user
	public List<Property> findByOwner_Id(@Param("id") int id); 

	
}
