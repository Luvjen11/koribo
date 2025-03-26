package com.koribo_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.koribo_backend.model.Category;
import com.koribo_backend.repository.CategoryRepository;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(Category category) {
        // Check if category already exists
        Category existingCategory = categoryRepository.findByName(category.getName());
        if (existingCategory != null) {
            return null; // Return null if category name already exists
        }
        
        // Save the category directly
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }
}
