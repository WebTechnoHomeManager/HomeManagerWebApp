package com.homemanager.springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.homemanager.springboot.model.Chat;
import com.homemanager.springboot.model.User;
import com.homemanager.springboot.repository.ChatRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/v1/chat")
public class ChatController {
	
	@Autowired
	private ChatRepository chatRepository;
	
	@GetMapping()
	  public @ResponseBody Iterable<Chat> getAllMessages() {
	    return chatRepository.findAll();
	}
	
	@PostMapping("/add")
	public Chat addMessage(@RequestBody Chat chat) {
		return chatRepository.save(chat);
	}
	
	@GetMapping("/{idSender}/{idRecipient}")
	public List<Chat> getMessagesBySenderAndRecipient(@PathVariable Integer idSender, @PathVariable Integer idRecipient) {
		List<Chat> messages = chatRepository.findByIdSenderAndIdRecipient(idSender, idRecipient);
		return messages;
	}

}
