package com.homemanager.springboot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.homemanager.springboot.model.Chat;
import com.homemanager.springboot.model.PropertyPhoto;

@Repository
public interface PropertyPhotoRepository extends JpaRepository<PropertyPhoto, Integer> {

	public Optional<PropertyPhoto> findById(Integer id);

	public List<PropertyPhoto> findByProperty_Id(Integer id);
}
