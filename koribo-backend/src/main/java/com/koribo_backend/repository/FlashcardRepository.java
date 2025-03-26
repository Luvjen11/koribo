package com.koribo_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.koribo_backend.model.Flashcard;

@Repository
public interface FlashcardRepository extends JpaRepository<Flashcard, Long>{
    
}
