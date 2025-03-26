package com.koribo_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.koribo_backend.model.Category;
import com.koribo_backend.model.Flashcard;
import com.koribo_backend.model.Language;
import com.koribo_backend.service.FlashcardService;

@RestController
@CrossOrigin("*")
@RequestMapping("/koribo/flashcards")
public class FlashcardController {
    
    @Autowired
    private FlashcardService flashcardService;

    // create flashcard
    @PostMapping
    public ResponseEntity<Flashcard> createFlashcard(@RequestBody Flashcard flashcard) {
        Flashcard createdFlashcard = flashcardService.createFlashcard(flashcard);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFlashcard);
    }

    // get all flashcard
    @GetMapping
    public ResponseEntity<List<Flashcard>> getAllFlashcards() {
        return ResponseEntity.ok(flashcardService.getAllFlashcards());
    }

    // get all flashcards by language
    @GetMapping("/language/{language}")
    public ResponseEntity<List<Flashcard>> getFlashcardsByLanguage(@PathVariable Language language) {
        return ResponseEntity.ok(flashcardService.getAllFlashcardsByLanguage(language));
    }

    // get all flashcards by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Flashcard>> getFlashcardsByCategory(
            @RequestParam Category category) {
        return ResponseEntity.ok(flashcardService.getAllFlashcardsByCategory(category));
    }

    // get all flashcards by language and category
    @GetMapping("/language/{language}/category/{category}")
    public ResponseEntity<List<Flashcard>> getFlashcardsByCategory(
            @RequestParam Language language,
            @RequestParam Category category) {
        return ResponseEntity.ok(flashcardService.getAllFlashcardsByLanguageAndCategory(language, category));
    }

    // delete flashcard
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlashcard(@PathVariable Long id) {
        flashcardService.deleteFlashcard(id);
        return ResponseEntity.noContent().build();
    }
}
