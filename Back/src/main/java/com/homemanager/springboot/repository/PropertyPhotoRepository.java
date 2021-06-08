package com.homemanager.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.homemanager.springboot.model.PropertyPhoto;

@Repository
public interface PropertyPhotoRepository extends JpaRepository<PropertyPhoto, String> {

}
