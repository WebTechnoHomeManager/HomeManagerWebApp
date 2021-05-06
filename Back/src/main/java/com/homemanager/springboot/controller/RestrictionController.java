package com.homemanager.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

//import org.springframework.beans.factory.annotation.Autowired;

import com.homemanager.springboot.model.Restriction;
import com.homemanager.springboot.repository.RestrictionRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class RestrictionController {
	@Autowired
	private RestrictionRepository restrictionRepository;
	
	@GetMapping(path="/constraints")
	  public @ResponseBody Iterable<Restriction> getAllConstraints() {
	    // This returns a JSON or XML with the users
	    return restrictionRepository.findAll();
	  }
}