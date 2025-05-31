package com.koribo_backend.service;

import com.koribo_backend.model.ContentSection;
import com.koribo_backend.model.Lesson;
import com.koribo_backend.repository.ContentSectionRepository;
import com.koribo_backend.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContentSectionService {

    private final ContentSectionRepository contentSectionRepository;
    private final LessonRepository lessonRepository;

    @Autowired
    public ContentSectionService(ContentSectionRepository contentSectionRepository, LessonRepository lessonRepository) {
        this.contentSectionRepository = contentSectionRepository;
        this.lessonRepository = lessonRepository;
    }

    public List<ContentSection> getAllContentSections() {
        return contentSectionRepository.findAll();
    }

    public List<ContentSection> getContentSectionsByLesson(Long lessonId) {
        return contentSectionRepository.findByLessonId(lessonId);
    }

    public Optional<ContentSection> getContentSectionById(Long id) {
        return contentSectionRepository.findById(id);
    }

    public ContentSection createContentSection(Long lessonId, ContentSection contentSection) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found with id: " + lessonId));
        
        contentSection.setLesson(lesson);
        return contentSectionRepository.save(contentSection);
    }

    public ContentSection updateContentSection(Long id, ContentSection contentSectionDetails) {
        ContentSection contentSection = contentSectionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Content section not found with id: " + id));
        
        contentSection.setType(contentSectionDetails.getType());
        contentSection.setText(contentSectionDetails.getText());
        contentSection.setImageUrl(contentSectionDetails.getImageUrl());
        
        return contentSectionRepository.save(contentSection);
    }

    public void deleteContentSection(Long id) {
        contentSectionRepository.deleteById(id);
    }
} 