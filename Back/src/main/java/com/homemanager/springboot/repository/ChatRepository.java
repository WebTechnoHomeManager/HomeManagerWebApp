package com.homemanager.springboot.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.homemanager.springboot.model.Chat;
import com.homemanager.springboot.model.User;

public interface ChatRepository extends CrudRepository<Chat, Integer>{

	
	public List<Chat> findBySender_IdAndRecipient_Id(int idSender, int idRecipient);
	
	public List<Chat> findBySender_Id(int idSender);
	
	public List<Chat> findByRecipient_Id(int idSender);
}
