package com.homemanager.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class HomeManagerBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(HomeManagerBackApplication.class, args);
	}

	@SuppressWarnings("deprecation")
	@Bean
	// To avoid the error thrown when we send and receive request on different url or port:
	// "Access to XMLHttpRequest at 'http://localhost:9090/api/v1/properties/search' 
	// from origin 'http://localhost:3000' has been blocked by CORS policy: 
	// Response to preflight request doesn't pass access control check: 
    // No 'Access-Control-Allow-Origin' header is present on the requested resource."
   public WebMvcConfigurer corsConfigurer() {
      return new WebMvcConfigurerAdapter() {
         @Override
         public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**").allowedOrigins("http://localhost:3000");
         }
      };
   }
}
