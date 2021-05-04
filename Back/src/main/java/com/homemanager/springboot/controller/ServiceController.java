package com.homemanager.springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

//import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.homemanager.springboot.model.Service;
import com.homemanager.springboot.repository.ServiceRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class ServiceController {
	@Autowired
	private ServiceRepository serviceRepository;
	
	
	@GetMapping(path="/services")
	  public @ResponseBody Iterable<Service> getAllServices() {
	    // This returns a JSON or XML with the users
	    return serviceRepository.findAll();
	  }
	
	/*@GetMapping("/property_services")
	public List<Service> getServicesByPropertyId() {
		List<Service> listServices = serviceRepository.getListServices();
	    return listServices;
	}*/
	
}
