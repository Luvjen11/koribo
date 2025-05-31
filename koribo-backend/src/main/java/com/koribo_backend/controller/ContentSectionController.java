package com.koribo_backend.controller;

import com.koribo_backend.model.ContentSection;
import com.koribo_backend.service.ContentSectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/koribo/content-sections")
@CrossOrigin("*")
public class ContentSectionController {

    private final ContentSectionService contentSectionService;

    @Autowired
    public ContentSectionController(ContentSectionService contentSectionService) {
        this.contentSectionService = contentSectionService;
    }

    @GetMapping
    public ResponseEntity<List<ContentSection>> getAllContentSections(
            @RequestParam(required = false) Long lessonId) {
        
        if (lessonId != null) {
            return ResponseEntity.ok(contentSectionService.getContentSectionsByLesson(lessonId));
        }
        
        return ResponseEntity.ok(contentSectionService.getAllContentSections());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContentSection> getContentSectionById(@PathVariable Long id) {
        return contentSectionService.getContentSectionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ContentSection> createContentSection(
            @RequestParam Long lessonId, @RequestBody ContentSection contentSection) {
        try {
            ContentSection createdSection = contentSectionService.createContentSection(lessonId, contentSection);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSection);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContentSection> updateContentSection(
            @PathVariable Long id, @RequestBody ContentSection contentSectionDetails) {
        try {
            ContentSection updatedSection = contentSectionService.updateContentSection(id, contentSectionDetails);
            return ResponseEntity.ok(updatedSection);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContentSection(@PathVariable Long id) {
        contentSectionService.deleteContentSection(id);
        return ResponseEntity.noContent().build();
    }
} 