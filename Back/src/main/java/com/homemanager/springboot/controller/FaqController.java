package com.homemanager.springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.homemanager.springboot.model.Faq;
import com.homemanager.springboot.repository.FaqRepository;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/v1/faq")
public class FaqController {
	
	@Autowired
	private FaqRepository faqRepository;
	
	@GetMapping()
	  public @ResponseBody Iterable<Faq> getAllQuestions() {
	    return faqRepository.findAll();
	  }
}
