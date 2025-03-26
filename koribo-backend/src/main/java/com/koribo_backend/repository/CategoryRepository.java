package com.koribo_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.koribo_backend.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String name);
    
}
