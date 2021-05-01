package com.homemanager.springboot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.homemanager.springboot.model.Faq;
import com.homemanager.springboot.repository.FaqRepository;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
public class FaqController {
	@Autowired
	private FaqRepository faqRepository;
	
	@GetMapping(path="/faq")
	  public @ResponseBody Iterable<Faq> getAllQuestions() {
	    // This returns a JSON or XML with the users
	    return faqRepository.findAll();
	  }
}
