package com.example.data_visualization.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins(
                "https://data-cbodtwzga-abhishek82210s-projects.vercel.app",
                "http://localhost:3000"
            )
            .allowedMethods("*") // Allow all HTTP methods
            .allowedHeaders("*")
            .exposedHeaders(
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials"
            )
            .allowCredentials(true)
            .maxAge(4800); // Increase preflight cache time
    }
}
