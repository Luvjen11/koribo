package com.koribo_backend.repository;

import java.util.List;
import com.koribo_backend.model.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.koribo_backend.model.Flashcard;
import com.koribo_backend.model.Language;

@Repository
public interface FlashcardRepository extends JpaRepository<Flashcard, Long>{
    
    List<Flashcard> findByLanguage(Language language);
    
    List<Flashcard> findByCategory(Category category);
    
    List<Flashcard> findByLanguageAndCategory(Language language, Category category);
}
