package com.homemanager.springboot.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.homemanager.springboot.message.ResponseFile;
import com.homemanager.springboot.model.PropertyPhoto;
import com.homemanager.springboot.repository.PropertyPhotoRepository;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class PropertyPhotoController {

  @Autowired
  private PropertyPhotoRepository propertyPhotoRepository;

  @PostMapping(path="/files")
  public ResponseEntity<String> uploadFile(@RequestParam MultipartFile file) {
    String message = "";
    try {
      String photoName = StringUtils.cleanPath(file.getOriginalFilename());
      PropertyPhoto propertyPhoto = new PropertyPhoto(photoName, file.getContentType(), file.getBytes());
      propertyPhotoRepository.save(propertyPhoto);

      message = "Uploaded the file successfully: " + file.getOriginalFilename();
      return ResponseEntity.status(HttpStatus.OK).body(message);
    } catch (Exception e) {
      message = "Could not upload the file: " + file.getOriginalFilename() + "!";
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
    }
  }

  @GetMapping("/files")
  public ResponseEntity<List<ResponseFile>> getListFiles() {
    List<ResponseFile> files = propertyPhotoRepository.findAll().stream().map(photo -> {
      String fileDownloadUri = ServletUriComponentsBuilder
          .fromCurrentContextPath()
          .path("/files/")
          .path(String.valueOf(photo.getId()))
          .toUriString();

      return new ResponseFile(
          photo.getName(),
          fileDownloadUri,
          photo.getType(),
          photo.getData().length);
    }).collect(Collectors.toList());

    return ResponseEntity.status(HttpStatus.OK).body(files);
  }

  @GetMapping("/files/{id}")
  public ResponseEntity<byte[]> getFile(@PathVariable String id) {
	  PropertyPhoto propertyPhoto = propertyPhotoRepository.findById(id).get();

    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + propertyPhoto.getName() + "\"")
        .body(propertyPhoto.getData());
  }
}