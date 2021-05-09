package com.homemanager.springboot.repository;

import org.springframework.data.repository.CrudRepository;
import com.homemanager.springboot.model.Restriction;

public interface RestrictionRepository extends CrudRepository<Restriction, Integer> {

}
