package com.koribo_backend.repository;

import com.koribo_backend.model.Lesson;
import com.koribo_backend.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByModule(Module module);
    List<Lesson> findByModuleOrderByOrderIndexAsc(Module module);
    List<Lesson> findByModuleId(Long moduleId);
}