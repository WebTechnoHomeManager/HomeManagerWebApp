package com.homemanager.springboot.repository;

import org.springframework.data.repository.CrudRepository;
import com.homemanager.springboot.model.Service;

public interface ServiceRepository extends CrudRepository<Service, Integer> {

}
