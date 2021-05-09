package com.homemanager.springboot.repository;

//import java.util.List;

//import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.homemanager.springboot.model.Service;

public interface ServiceRepository extends CrudRepository<Service, Integer> {

}
