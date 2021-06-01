package com.homemanager.springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.ResponseEntity;

import com.homemanager.springboot.model.Property;
import com.homemanager.springboot.model.Reservation;
import com.homemanager.springboot.model.Restriction;
import com.homemanager.springboot.model.Service;
import com.homemanager.springboot.model.User;
import com.homemanager.springboot.repository.PropertyRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
@SuppressWarnings("unchecked")
public class PropertyController {
	@Autowired
	// This means to get the bean called propertyRepository
    // Which is auto-generated by Spring, we will use it to handle the data
	private PropertyRepository propertyRepository;
	
	@GetMapping("/properties")
	public @ResponseBody Iterable<Property> getAllProperties() {
		// This returns a JSON or XML with the users
		return propertyRepository.findAll();
	}
	
	@PostMapping("/properties")
	public Property createProperty(@RequestBody Property property) {
		return propertyRepository.save(property);
	}
	 
	@GetMapping("/properties/{id}")
	public Property findPropertyById(@PathVariable Integer id) {
		Optional<Property> Property = propertyRepository.findById(id);
		return Property.get();
	}
	
	@GetMapping("/properties/recent")
	public @ResponseBody Iterable<Property> getFourMostRecentProperties() {
		
		List<Property> propertiesList = (List<Property>) propertyRepository.findAll();
		int propertiesListLength = propertiesList.size();
		
		List<Property> recentPropertiesList = new ArrayList<Property>();
		
		recentPropertiesList.add(propertiesList.get(propertiesListLength-1));
		recentPropertiesList.add(propertiesList.get(propertiesListLength-2));
		recentPropertiesList.add(propertiesList.get(propertiesListLength-3));
		recentPropertiesList.add(propertiesList.get(propertiesListLength-4));
		
		return recentPropertiesList;
	}
	
	@GetMapping("/properties/owner/{id}")
	public List<Property> findByOwner_Id(@PathVariable Integer id) {
		return propertyRepository.findByOwner_Id(id);
	}
	 
	@PutMapping("/properties/{id}")
	public ResponseEntity<Property> updateProperty(@PathVariable Integer id, @RequestBody Property propertyDetails){
		Property property = propertyRepository.findById(id)
				.orElseThrow();
		
		property.setTitle(propertyDetails.getTitle());
		property.setDescription(propertyDetails.getDescription());
		property.setAddress(propertyDetails.getAddress());
		property.setCity(propertyDetails.getCity());
		property.setTotalOccupancy(propertyDetails.getTotalOccupancy());
		property.setLatitude(propertyDetails.getLatitude());
		property.setLongitude(propertyDetails.getLongitude());
		property.setPropertyType(propertyDetails.getPropertyType());
		property.setPropertyServices(propertyDetails.getPropertyServices());
		property.setPropertyRestrictions(property.getPropertyRestrictions());
		
		Property updatedProperty = propertyRepository.save(property);
		return ResponseEntity.ok(updatedProperty);
	}
		
	@DeleteMapping("/properties/{id}")
	public String deleteProperty(@PathVariable Integer id) throws JSONException{
		Property property = propertyRepository.findById(id)
				.orElseThrow();
		
		propertyRepository.delete(property);
		
		JSONObject response = new JSONObject();
		response.put("deletedId", id);
		return response.toString();
	}
	
	@PostMapping("/properties/search")
	public List<Property> getEmployeeById(@RequestBody String dataString) throws JSONException, ParseException {
		
		JSONObject data = new JSONObject(dataString);
		List<String> locationsList = convertJSONArrayInArrayList((JSONArray) data.get("locations"));
		List<Integer> servicesIdList = getEntityIdListFromJSON((JSONArray) data.get("services"));
		List<Integer> restrictionsIdList = getEntityIdListFromJSON((JSONArray) data.get("restrictions"));
		Date dateFrom = !data.get("dateFrom").equals("") ? new SimpleDateFormat("yyyy-MM-dd").parse(data.get("dateFrom").toString()) : null;
		Date dateTo = !data.get("dateTo").equals("") ? new SimpleDateFormat("yyyy-MM-dd").parse(data.get("dateTo").toString()) : null;
		
		List<Property> listPropertyLocation = new ArrayList<>();
		if (locationsList.size() > 0) {
			listPropertyLocation = propertyRepository.getPropertyBy(locationsList);
		} else {
			listPropertyLocation = (List<Property>) propertyRepository.findAll();
		}
				
		List<Property> listProperty = listPropertyLocation.stream()
				.filter(x -> areEveryServicesInList(x.getPropertyServices(), servicesIdList)
						&& areEveryRestrictionsInList(x.getPropertyRestrictions(), restrictionsIdList)
						&& !areDatesRangesOverlap(x.getReservations(), dateFrom, dateTo))
				.sorted(Comparator.comparing(Property::getId).reversed())
				.collect(Collectors.toList());

		return listProperty;
	}
	
	private boolean areDatesRangesOverlap(Set<Reservation> propertyReservationsList, Date startDate, Date endDate) {
		if (startDate != null && endDate != null) {
			Date reservationStart = null;
			Date reservationEnd = null;
			
			for(Reservation reservation : propertyReservationsList) {
				reservationStart = new Date(reservation.getStart_date().getTime());
				reservationEnd = new Date(reservation.getEnd_date().getTime());
				if ((reservationEnd.after(startDate) || reservationEnd.equals(startDate))
						&& (reservationStart.before(endDate) || reservationStart.equals(endDate))){
					return true;
				}
			}
		}	
		return false;
	}
	
	
	private boolean areEveryServicesInList(Set<Service> propertyServicesList, List<Integer> inputServicesIdList) {
		for(Service service : propertyServicesList) {
			if (!inputServicesIdList.contains(service.getId())){
				return false;
			}
		}
		return true;
	}
	
	private boolean areEveryRestrictionsInList(Set<Restriction> propertyRestrictionsList, List<Integer> inputRestrictionsIdList) {
		for(Restriction restriction : propertyRestrictionsList) {
			if (!inputRestrictionsIdList.contains(restriction.getId())){
				return false;
			}
		}
		return true;
	}
	
	private List<String> convertJSONArrayInArrayList(JSONArray jsonArray) throws JSONException{
		
		ArrayList<String> list = new ArrayList<String>();     
		if (jsonArray != null) { 
		   for (int i=0; i < jsonArray.length(); i++){ 
			   list.add(jsonArray.getString(i).toLowerCase());
		   } 
		} 
		return list;
	}
	
	private List<Integer> getEntityIdListFromJSON(JSONArray jsonArray) throws JSONException{
		
		ArrayList<Integer> list = new ArrayList<Integer>();     
		if (jsonArray != null) { 
		   for (int i=0; i < jsonArray.length(); i++){ 
			   int serviceId = jsonArray.getJSONObject(i).getInt("id");
			   list.add(serviceId);
		   } 
		} 
		return list;
	}
}
