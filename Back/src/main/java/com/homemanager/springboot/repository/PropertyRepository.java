package com.homemanager.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.homemanager.springboot.model.Property;

public interface PropertyRepository extends CrudRepository<Property, Integer> {

	@Query("SELECT P "
			+ "FROM Property P "
			+ "WHERE P.city in :loca")
	public List<Property> getPropertyBy(
			@Param("loca") String locations/*,
			@Param("dateF") String dateFrom,
			@Param("dateT") String dateTo,
			@Param("serv") String services,
			@Param("const") String constraints*/);
	
}
