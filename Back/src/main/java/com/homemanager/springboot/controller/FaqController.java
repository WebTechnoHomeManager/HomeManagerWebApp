package com.homemanager.springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.homemanager.springboot.model.Faq;
import com.homemanager.springboot.repository.FaqRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

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
	
	@PostMapping()
	public Faq createFaq(@RequestBody Faq faq) {
		return faqRepository.save(faq);
	}

	@GetMapping("/{id}")
	public Faq findFaqById(@PathVariable Integer id) {
		Optional<Faq> Faq = faqRepository.findById(id);
		return Faq.get();
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Faq> updateFaq(@PathVariable Integer id, @RequestBody Faq faqDetails){
		Faq faq = faqRepository.findById(id)
				.orElseThrow();
		
		faq.setQuestion(faqDetails.getQuestion());
		faq.setAnswer(faqDetails.getAnswer());
		
		Faq updatedFaq = faqRepository.save(faq);
		return ResponseEntity.ok(updatedFaq);
	}
		
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteFaq(@PathVariable Integer id){
		Faq faq = faqRepository.findById(id)
				.orElseThrow();
		
		faqRepository.delete(faq);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
