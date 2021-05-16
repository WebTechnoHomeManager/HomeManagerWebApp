package com.homemanager.springboot.repository;

import org.springframework.data.repository.CrudRepository;

import com.homemanager.springboot.model.User;

//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Integer> {

    //public List<Property> findByCityInAnd(List<String> locationsList)
    public User findByEmail(String email);
}
