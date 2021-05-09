package com.homemanager.springboot.repository;

import java.util.List;

import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.homemanager.springboot.model.Property;

public interface PropertyRepository extends CrudRepository<Property, Integer> {

	@Query("SELECT P "
			+ "FROM Property P "
			+ "LEFT JOIN Reservation R ON P.id = R.property_reservation "
			+ "WHERE P.city in (:loca) "
			//+ "AND R.start_date < '2022-04-03'"
			+ "")
	//@Query("FROM ReleaseDateType AS rdt  rdt.cacheMedias AS cm WHERE cm.id = ?1") 
	public List<Property> getPropertyBy(
			@Param("loca") List<String> locations/*,
			@Param("dateF") String dateFrom,
			@Param("dateT") String dateTo,
			@Param("serv") String services,
			@Param("const") String constraints*/);
	
	//public List<Property> findByCityInAnd(List<String> locationsList);
	
}
