package com.homemanager.springboot.controller;

import com.homemanager.springboot.model.Property;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.homemanager.springboot.model.User;
import com.homemanager.springboot.repository.UserRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/v1/users")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;

	@GetMapping()
	public @ResponseBody Iterable<User> getAllUsers() {
		return userRepository.findAll();
	}

	@PostMapping()
	public User createUser(@RequestBody User user) {
		User userIfExists = userRepository.findByEmail(user.getEmail());
		if(userIfExists != null) {
			return null;
		}
		return userRepository.save(user);
	}

	@GetMapping("/{id}")
	public User findUserById(@PathVariable Integer id) {
		Optional<User> User = userRepository.findById(id);
		return User.get();
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@RequestBody User userDetails, @PathVariable Integer id) {
		User user = userRepository.findById(id).get();

		user.setFirstName(userDetails.getFirstName());
		user.setLastName(userDetails.getLastName());
		user.setEmail(userDetails.getEmail());
		user.setPassword(userDetails.getPassword());

		userRepository.save(user);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable Integer id) {
		userRepository.deleteById(id);
	}

	@PostMapping("/authentication")
	public String checkAuthentication(@RequestBody String dataString) throws Exception, JSONException {

		JSONObject data = new JSONObject(dataString);
		String email = data.get("email").toString();
		String password = data.get("password").toString();

		JSONObject response = new JSONObject();
		User user = userRepository.findByEmail(email);
		if (user == null) {
			response.put("error", "UserNotFound");
		} else if (!user.isPasswordRight(password)){
			response.put("error", "WrongPassword");
		} else if (user.isPasswordRight(password)) {
			response.put("user", user);
		}
		return response.toString();
	}
}
