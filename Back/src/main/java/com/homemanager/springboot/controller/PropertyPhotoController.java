package com.homemanager.springboot.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.homemanager.springboot.model.PropertyPhoto;
import com.homemanager.springboot.model.Reservation;
import com.homemanager.springboot.repository.PropertyPhotoRepository;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/files")
public class PropertyPhotoController {

	@Autowired
	private PropertyPhotoRepository propertyPhotoRepository;

	@GetMapping()
	public @ResponseBody Iterable<PropertyPhoto> getAllPropertyPhotos() {
		return propertyPhotoRepository.findAll();
	}
	
	@PostMapping()
	public ResponseEntity<String> uploadFile(@RequestParam("files") List<MultipartFile> files) throws JSONException {

		String message = "";
		List<Integer> photoIds = new ArrayList<>();
		try {
			
			for (MultipartFile file : files) {
				String photoName = StringUtils.cleanPath(file.getOriginalFilename());
				PropertyPhoto propertyPhoto = new PropertyPhoto(photoName, file.getContentType(), file.getBytes());
				propertyPhotoRepository.save(propertyPhoto);
				photoIds.add(propertyPhoto.getId());
			}
			
			if (files.size() == 1) {
				//message = "File successfully uploaded: " + files.get(0).getOriginalFilename();
				message = files.size() + " file successfully uploaded.";
			} else {
				message = files.size() + " files successfully uploaded.";
			}
			
			JSONObject response = new JSONObject();
			response.put("message", message);
			response.put("photoIds", photoIds);

			return ResponseEntity.status(HttpStatus.OK).body(response.toString());
			
		} catch (Exception e) {
			//message = "Could not upload the file: " + file.getOriginalFilename() + "!";
			message = e.toString();
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}

	@GetMapping("/property/{id}")
	public List<PropertyPhoto> findByProperty(@PathVariable Integer id) {
		return propertyPhotoRepository.findByProperty_Id(id);
	}
}