package com.koribo_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.koribo_backend.model.Category;
import com.koribo_backend.model.Flashcard;
import com.koribo_backend.model.Language;
import com.koribo_backend.repository.CategoryRepository;
import com.koribo_backend.repository.FlashcardRepository;

@Service
public class FlashcardService {
    

    @Autowired
    private FlashcardRepository flashcardRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // create flashcard
    public Flashcard createFlashcard(Flashcard flashcard) {
        // Check if the category already exists
        Category category = categoryRepository.findByName(flashcard.getCategory().getName());

        if (category == null) {
            // If the category doesn't exist, save it first
            category = categoryRepository.save(flashcard.getCategory());
        }

        // Assign the saved category to the flashcard
        flashcard.setCategory(category);

        // Save the flashcard
        return flashcardRepository.save(flashcard);
    }

    // get all flashcards
    public List<Flashcard> getAllFlashcards() {
        return flashcardRepository.findAll();
    }

    // get all flashcards by language
    public List<Flashcard> getAllFlashcardsByLanguage(Language language) {
        return flashcardRepository.findByLanguage(language);
    }

    // get all flashcards by category
    public List<Flashcard> getAllFlashcardsByCategory(Category category) {
        return flashcardRepository.findByCategory(category);
    }

    // get all flashcards by language and category
    public List<Flashcard> getAllFlashcardsByLanguageAndCategory(Language language, Category category) {
       return flashcardRepository.findByLanguageAndCategory(language, category); 
    }

    // get flashcard by id
    public Flashcard getFlashcardById(Long id) {
        return flashcardRepository.findById(id).orElse(null);
    }

    // update flashcard

    // delete flashcard
    public void deleteFlashcard(Long id) {

        if (!flashcardRepository.existsById(id)) {
            throw new RuntimeException("Flashcard not found with id: " + id);
        }

        flashcardRepository.deleteById(id);
    }
}
