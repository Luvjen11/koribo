package com.koribo_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "flashcards")
public class Flashcard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String word;
    
    private String translation;
    
    @Enumerated(EnumType.STRING)
    private Language language;
    
    private String context;
    
    private String mnemonic;
    
    private String imageUrl;
    
    private String audioUrl;
    
    private Integer orderIndex;
    
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false) 
    @JsonBackReference("category-flashcards")
    private Category category;

    @JsonBackReference("lesson-flashcards")
    @ManyToOne
    @JoinColumn(name = "lesson_id", nullable = true)
    private Lesson lesson;
}
