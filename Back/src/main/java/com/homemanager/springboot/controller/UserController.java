package com.homemanager.springboot.controller;

import com.homemanager.springboot.model.Chat;
import com.homemanager.springboot.model.Property;
import com.homemanager.springboot.model.PropertyPhoto;
import com.homemanager.springboot.model.Reservation;

import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
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
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.homemanager.springboot.model.User;
import com.homemanager.springboot.repository.ChatRepository;
import com.homemanager.springboot.repository.PropertyPhotoRepository;
import com.homemanager.springboot.repository.PropertyRepository;
import com.homemanager.springboot.repository.ReservationRepository;
import com.homemanager.springboot.repository.UserRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/v1/users")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ChatRepository chatRepository;
	@Autowired
	private PropertyRepository propertyRepository;
	@Autowired
	private PropertyPhotoRepository propertyPhotoRepository;
	@Autowired
	private ReservationRepository reservationRepository;

    @PersistenceContext
    private EntityManager entityManager;
    
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
		user.setDateBirth(userDetails.getDateBirth());
		user.setTel(userDetails.getTel());

		userRepository.save(user);
		return ResponseEntity.noContent().build();
	}

	@SuppressWarnings("unchecked")
	@DeleteMapping("/{id}")
	public String deleteUser(@PathVariable Integer id) throws JSONException {
		
		// delete chat messages from and to user
		List<Chat> messagesFrom = chatRepository.findBySender_Id(id);
		for (Chat message : messagesFrom) {
			chatRepository.delete(message);
		}
		List<Chat> messagesTo = chatRepository.findByRecipient_Id(id);
		for (Chat message : messagesTo) {
			chatRepository.delete(message);
		}
		
		// delete user's properties
		List<Property> properties = propertyRepository.findByOwner_Id(id);
		for (Property property : properties) {
			// delete reservations of user's properties
			List<Reservation> reservations = reservationRepository.findByProperty_Id(property.getId());
			for (Reservation reservation : reservations) {
				reservationRepository.delete(reservation);
			}
			// delete photos of user's properties
			List<PropertyPhoto> photos = propertyPhotoRepository.findByProperty_Id(property.getId());
			for (PropertyPhoto photo : photos) {
				propertyPhotoRepository.delete(photo);
			}

			propertyRepository.delete(property);
		}
		
		// delete user's reservations
		List<Reservation> reservations = reservationRepository.findByReservationUser_Id(id);
		for (Reservation reservation : reservations) {
			reservationRepository.delete(reservation);
		}

		userRepository.deleteById(id);

		JSONObject response = new JSONObject();
		response.put("deletedId", id);
		return response.toString();
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
