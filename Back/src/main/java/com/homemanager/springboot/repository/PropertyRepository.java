package com.homemanager.springboot.repository;

import org.springframework.data.repository.CrudRepository;
import com.homemanager.springboot.model.Property;

public interface PropertyRepository extends CrudRepository<Property, Integer> {

}
