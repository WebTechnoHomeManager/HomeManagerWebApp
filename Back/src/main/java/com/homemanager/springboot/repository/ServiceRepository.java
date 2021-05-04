package com.homemanager.springboot.repository;

//import java.util.List;

//import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.homemanager.springboot.model.Service;

public interface ServiceRepository extends CrudRepository<Service, Integer> {

	/*@Query("SELECT service.id, service.name, service.description FROM service JOIN property_services ON service.id = property_services.service_id JOIN property ON property.id = property_services.property_id WHERE property.id = 1")
	public List<Service> getListServices();*/
}
