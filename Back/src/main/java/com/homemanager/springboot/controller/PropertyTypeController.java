package com.homemanager.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.homemanager.springboot.model.Property_type;
import com.homemanager.springboot.repository.PropertyTypeRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class PropertyTypeController {
	@Autowired
	private PropertyTypeRepository propertytypeRepository;
	@GetMapping(path="/types")
	  public @ResponseBody Iterable<Property_type> getAllTypes() {
	    // This returns a JSON or XML with the users
	    return propertytypeRepository.findAll();
	  }
}
