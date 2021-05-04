package com.homemanager.springboot.repository;

import org.springframework.data.repository.CrudRepository;

import com.homemanager.springboot.model.Faq;

public interface FaqRepository extends CrudRepository<Faq, Integer> {

}
