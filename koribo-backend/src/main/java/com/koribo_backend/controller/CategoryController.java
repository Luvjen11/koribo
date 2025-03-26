package com.koribo_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.koribo_backend.model.Category;
import com.koribo_backend.service.CategoryService;

@RestController
@CrossOrigin("*")
@RequestMapping("koribo/categories")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    //get all categories
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories(){
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    // create category  
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        Category newCategory = categoryService.createCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);
    }
}
