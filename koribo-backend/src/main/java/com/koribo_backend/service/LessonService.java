package com.koribo_backend.service;

import com.koribo_backend.model.Lesson;
import com.koribo_backend.model.Module;
import com.koribo_backend.model.Category;
import com.koribo_backend.repository.LessonRepository;
import com.koribo_backend.repository.ModuleRepository;
import com.koribo_backend.repository.CategoryRepository;
import com.koribo_backend.repository.ContentSectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList; 
import java.util.List;
import java.util.Optional;

@Service
public class LessonService {

    private final LessonRepository lessonRepository;
    private final ModuleRepository moduleRepository;
    private final CategoryRepository categoryRepository;
    private final ContentSectionRepository contentSectionRepository;

    @Autowired
    public LessonService(LessonRepository lessonRepository, ModuleRepository moduleRepository, CategoryRepository categoryRepository, ContentSectionRepository contentSectionRepository) {
        this.lessonRepository = lessonRepository;
        this.moduleRepository = moduleRepository;
        this.categoryRepository = categoryRepository;
        this.contentSectionRepository = contentSectionRepository;
    }

    public List<Lesson> getAllLessons() {
        return lessonRepository.findAll();
    }

    public List<Lesson> getLessonsByModule(Long moduleId) {
        return lessonRepository.findByModuleId(moduleId);
    }

    public List<Lesson> getLessonsByModuleOrdered(Long moduleId) {
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new IllegalArgumentException("Module not found with id: " + moduleId));
        return lessonRepository.findByModuleOrderByOrderIndexAsc(module);
    }

    public Optional<Lesson> getLessonById(Long id) {
        return lessonRepository.findById(id);
    }

    public Lesson createLesson(Long moduleId, Lesson lesson) {
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new IllegalArgumentException("Module not found with id: " + moduleId));
        
        lesson.setModule(module);
        
        // Handle content sections
        if (lesson.getContentSections() != null) {
            lesson.getContentSections().forEach(section -> section.setLesson(lesson));
        }
        
        // Handle flashcards
        if (lesson.getFlashcards() != null) {
            lesson.getFlashcards().forEach(flashcard -> flashcard.setLesson(lesson));
        }
        
        return lessonRepository.save(lesson);
    }

    public Lesson updateLesson(Long id, Lesson lessonDetails) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found with id: " + id));
        
        // Update basic lesson properties
        lesson.setTitle(lessonDetails.getTitle());
        lesson.setDescription(lessonDetails.getDescription());
        lesson.setOrderIndex(lessonDetails.getOrderIndex());
        lesson.setImageUrl(lessonDetails.getImageUrl()); 
        lesson.setAudioUrl(lessonDetails.getAudioUrl());   
        lesson.setCompleted(lessonDetails.getCompleted()); 
        lesson.setProgressMarker(lessonDetails.getProgressMarker()); 

        // Handle ContentSections
        if (lesson.getContentSections() != null) {
            // Remove existing sections that are not in the update
            lesson.getContentSections().removeIf(section -> 
                lessonDetails.getContentSections() == null || 
                lessonDetails.getContentSections().stream()
                    .noneMatch(newSection -> 
                        newSection.getId() != null && 
                        newSection.getId().equals(section.getId())
                    )
            );
        }
        
        // Add or update sections
        if (lessonDetails.getContentSections() != null) {
            lessonDetails.getContentSections().forEach(section -> {
                if (section.getId() == null) {
                    // New section
                    section.setLesson(lesson);
                    lesson.addContentSection(section);
                } else {
                    // Update existing section
                    lesson.getContentSections().stream()
                        .filter(existingSection -> existingSection.getId().equals(section.getId()))
                        .findFirst()
                        .ifPresent(existingSection -> {
                            existingSection.setType(section.getType());
                            existingSection.setText(section.getText());
                            existingSection.setImageUrl(section.getImageUrl());
                        });
                }
            });
        }

        // Handle Flashcards
        if (lesson.getFlashcards() != null) {
            // Remove existing flashcards that are not in the update
            lesson.getFlashcards().removeIf(flashcard -> 
                lessonDetails.getFlashcards() == null || 
                lessonDetails.getFlashcards().stream()
                    .noneMatch(newFlashcard -> 
                        newFlashcard.getId() != null && 
                        newFlashcard.getId().equals(flashcard.getId())
                    )
            );
        }
        
        // Add or update flashcards
        if (lessonDetails.getFlashcards() != null) {
            lessonDetails.getFlashcards().forEach(fc -> {
                if (fc.getId() == null) {
                    // New flashcard
                    if (fc.getCategory() == null || fc.getCategory().getId() == null) {
                        Category defaultCategory = categoryRepository.findByName("Lesson " + lesson.getTitle());
                        if (defaultCategory == null) {
                            defaultCategory = new Category();
                            defaultCategory.setName("Lesson " + lesson.getTitle());
                            defaultCategory = categoryRepository.save(defaultCategory);
                        }
                        fc.setCategory(defaultCategory);
                    }
                    fc.setLesson(lesson);
                    lesson.addFlashcard(fc);
                } else {
                    // Update existing flashcard
                    lesson.getFlashcards().stream()
                        .filter(existingFlashcard -> existingFlashcard.getId().equals(fc.getId()))
                        .findFirst()
                        .ifPresent(existingFlashcard -> {
                            existingFlashcard.setWord(fc.getWord());
                            existingFlashcard.setTranslation(fc.getTranslation());
                            existingFlashcard.setLanguage(fc.getLanguage());
                            existingFlashcard.setContext(fc.getContext());
                            existingFlashcard.setMnemonic(fc.getMnemonic());
                            existingFlashcard.setImageUrl(fc.getImageUrl());
                            existingFlashcard.setAudioUrl(fc.getAudioUrl());
                            existingFlashcard.setOrderIndex(fc.getOrderIndex());
                            if (fc.getCategory() != null) {
                                existingFlashcard.setCategory(fc.getCategory());
                            }
                        });
                }
            });
        }
        
        return lessonRepository.save(lesson);
    }

    public void deleteLesson(Long id) {
        lessonRepository.deleteById(id);
    }
}