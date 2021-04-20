package com.homemanager.springboot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;

import com.homemanager.springboot.model.Service;
import com.homemanager.springboot.repository.ServiceRepository;

import com.homemanager.springboot.model.Constraint;
import com.homemanager.springboot.repository.ConstraintRepository;

@RestController
public class ConstraintServiceController {
	@Autowired
	private ConstraintRepository constraintRepository;
	@Autowired(required=true)
	private ServiceRepository serviceRepository;
	
	@GetMapping(path="/constraints")
	  public @ResponseBody Iterable<Constraint> getAllConstraints() {
	    // This returns a JSON or XML with the users
	    return constraintRepository.findAll();
	  }
	
	@GetMapping(path="/services")
	  public @ResponseBody Iterable<Service> getAllServices() {
	    // This returns a JSON or XML with the users
	    return serviceRepository.findAll();
	  }
}
