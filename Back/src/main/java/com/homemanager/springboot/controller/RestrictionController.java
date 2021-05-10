package com.homemanager.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//import org.springframework.beans.factory.annotation.Autowired;

import com.homemanager.springboot.model.Restriction;
import com.homemanager.springboot.repository.RestrictionRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/v1/")
public class RestrictionController {
	@Autowired
	private RestrictionRepository restrictionRepository;
	
	@GetMapping(path="/restrictions")
	  public @ResponseBody Iterable<Restriction> getAllConstraints() {
	    return restrictionRepository.findAll();
	  }
}
