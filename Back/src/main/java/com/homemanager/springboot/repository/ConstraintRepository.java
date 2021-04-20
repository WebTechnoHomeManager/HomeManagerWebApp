package com.homemanager.springboot.repository;

import org.springframework.data.repository.CrudRepository;
import com.homemanager.springboot.model.Constraint;

public interface ConstraintRepository extends CrudRepository<Constraint, Integer> {

}
