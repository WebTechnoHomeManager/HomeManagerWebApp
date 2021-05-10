package com.homemanager.springboot.controller;

import com.homemanager.springboot.model.Property;
import org.springframework.web.bind.annotation.*;

//import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.homemanager.springboot.model.Service;
import com.homemanager.springboot.repository.ServiceRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/v1/")
public class ServiceController {
	@Autowired
	private ServiceRepository serviceRepository;
	
	
	@GetMapping(path="/services")
	  public @ResponseBody Iterable<Service> getAllServices() {
	    return serviceRepository.findAll();
	  }

	/*@GetMapping("/property_services")
	public List<Service> getServicesByPropertyId() {
		List<Service> listServices = serviceRepository.getListServices();
	    return listServices;
	}*/
	
}
