package com.homemanager.springboot.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.homemanager.springboot.model.Chat;

public interface ChatRepository extends CrudRepository<Chat, Integer>{

	public List<Chat> findByIdSenderAndIdRecipient(int idSender, int idRecipient);
}
