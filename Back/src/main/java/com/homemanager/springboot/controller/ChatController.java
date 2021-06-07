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
import com.homemanager.springboot.repository.UserRepository;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
	
	@GetMapping("/{id1}/{id2}")
	public List<Chat> getMessagesBetweenTwoUsers(@PathVariable Integer id1, @PathVariable Integer id2) {
		List<Chat> messagesFromUser1 = chatRepository.findBySender_IdAndRecipient_Id(id1, id2);
		List<Chat> messagesFromUser2 = chatRepository.findBySender_IdAndRecipient_Id(id2, id1);
		
		List<Chat> messagesSortedByDate = Stream
				.concat(messagesFromUser1.stream(), messagesFromUser2.stream())
				.sorted(Comparator.comparing(Chat::getDatetime))
				.collect(Collectors.toList());
		
		return messagesSortedByDate;
	}
	
	@GetMapping("/interlocutors/{idUser}")
	public List<User> getIntercutorsWith(@PathVariable Integer idUser) {
		
		List<User> messagesFromUser = chatRepository.findBySender_Id(idUser).stream()
				.map(x -> x.getRecipient())
				.collect(Collectors.toList());
		
		List<User> messagesToUser = chatRepository.findByRecipient_Id(idUser).stream()
				.map(x -> x.getSender())
				.collect(Collectors.toList());
		
		List<User> interlocutors = Stream
				.concat(messagesFromUser.stream(), messagesToUser.stream())
				.distinct()
				.collect(Collectors.toList());
		
		return interlocutors;
	}

}
