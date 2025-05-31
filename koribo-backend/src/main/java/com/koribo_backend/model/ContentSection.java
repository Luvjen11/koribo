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
@Table(name = "content_sections")
public class ContentSection {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String type; // TEXT, IMAGE, etc.
    
    @Column(length = 4000)
    private String text;
    
    private String imageUrl;
    
    private String audioUrl;

    @JsonBackReference("lesson-content-sections")
    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
}