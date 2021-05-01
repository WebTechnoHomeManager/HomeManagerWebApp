package com.homemanager.springboot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.homemanager.springboot.model.Chat;
import com.homemanager.springboot.repository.ChatRepository;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
public class ChatController {
	@Autowired
	private ChatRepository chatRepository;
	
	@GetMapping(path="/chat")
	  public @ResponseBody Iterable<Chat> getAllMessages() {
	    // This returns a JSON or XML with the users
	    return chatRepository.findAll();
	  }
	
}
