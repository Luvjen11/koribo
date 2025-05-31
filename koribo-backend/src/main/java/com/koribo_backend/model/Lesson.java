package com.koribo_backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "lessons")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title; 
    
    private String description;
    
    private Integer orderIndex;
    
    private String imageUrl;
    
    private String audioUrl;
    
    private Boolean completed = false;
    
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("lesson-content-sections")
    private List<ContentSection> contentSections = new ArrayList<>();
    
    private String progressMarker;

    @JsonBackReference("module-lessons")
    @ManyToOne
    @JoinColumn(name = "module_id")
    private Module module;

    @JsonManagedReference("lesson-flashcards")
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Flashcard> flashcards = new ArrayList<>();

    // Helper methods
    public void addFlashcard(Flashcard flashcard) {
        if (this.flashcards == null) {
            this.flashcards = new ArrayList<>();
        }
        this.flashcards.add(flashcard);
        flashcard.setLesson(this);
    }
    
    public void removeFlashcard(Flashcard flashcard) {
        if (this.flashcards != null) {
            this.flashcards.remove(flashcard);
            flashcard.setLesson(null);
        }
    }

    public void addContentSection(ContentSection section) {
        if (this.contentSections == null) {
            this.contentSections = new ArrayList<>();
        }
        this.contentSections.add(section);
        section.setLesson(this);
    }
    
    public void removeContentSection(ContentSection section) {
        if (this.contentSections != null) {
            this.contentSections.remove(section);
            section.setLesson(null);
        }
    }
}
