package com.homemanager.springboot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;

import com.homemanager.springboot.model.Property;
import com.homemanager.springboot.repository.PropertyRepository;

@RestController
public class PropertyController {
	@Autowired// This means to get the bean called propertyRepository
    // Which is auto-generated by Spring, we will use it to handle the data
	private PropertyRepository propertyRepository;
	
	@GetMapping(path="/properties")
	  public @ResponseBody Iterable<Property> getAllProperties() {
	    // This returns a JSON or XML with the users
	    return propertyRepository.findAll();
	  }
}
