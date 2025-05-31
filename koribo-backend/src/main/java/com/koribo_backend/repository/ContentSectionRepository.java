package com.koribo_backend.repository;

import com.koribo_backend.model.ContentSection;
import com.koribo_backend.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentSectionRepository extends JpaRepository<ContentSection, Long> {
    List<ContentSection> findByLesson(Lesson lesson);
    List<ContentSection> findByLessonId(Long lessonId);
} 