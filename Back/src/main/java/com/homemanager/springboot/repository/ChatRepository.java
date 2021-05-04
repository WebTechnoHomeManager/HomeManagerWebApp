package com.homemanager.springboot.repository;

import org.springframework.data.repository.CrudRepository;

import com.homemanager.springboot.model.Chat;

public interface ChatRepository extends CrudRepository<Chat, Integer>{

}
