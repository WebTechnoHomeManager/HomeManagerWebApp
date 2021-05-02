package com.homemanager.springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;

import com.homemanager.springboot.model.Constraint;
import com.homemanager.springboot.repository.ConstraintRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class ConstraintController {
	@Autowired
	private ConstraintRepository constraintRepository;
	
	@GetMapping(path="/constraints")
	  public @ResponseBody Iterable<Constraint> getAllConstraints() {
	    // This returns a JSON or XML with the users
	    return constraintRepository.findAll();
	  }
}
