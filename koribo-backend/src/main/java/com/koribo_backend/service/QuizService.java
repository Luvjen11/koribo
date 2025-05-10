package com.koribo_backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.koribo_backend.model.Flashcard;
import com.koribo_backend.model.Language;
import com.koribo_backend.model.Quiz;
import com.koribo_backend.model.QuizQuestion;
import com.koribo_backend.repository.FlashcardRepository;
import com.koribo_backend.repository.QuizQuestionRepository;
import com.koribo_backend.repository.QuizRepository;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;
    
    @Autowired
    private QuizQuestionRepository quizQuestionRepository;
    
    @Autowired
    private FlashcardRepository flashcardRepository;
    
    private final Random random = new Random();
    
    /**
     * Creates a new quiz with the specified language and number of questions
     */
    @Transactional
    public Quiz createQuiz(Language language, Integer numberOfQuestions) {
        // Get flashcards for the requested language
        List<Flashcard> flashcards = flashcardRepository.findByLanguage(language);
        
        if (flashcards.isEmpty()) {
            throw new IllegalArgumentException("No flashcards found for language: " + language);
        }
        
        // Shuffle and limit to requested number
        Collections.shuffle(flashcards);
        int numQuestions = Math.min(numberOfQuestions, flashcards.size());
        List<Flashcard> selectedFlashcards = flashcards.subList(0, numQuestions);
        
        // Create quiz
        Quiz quiz = new Quiz();
        quiz.setLanguage(language);
        quiz.setNumberOfQuestions(numQuestions);
        quiz.setCreatedAt(LocalDateTime.now());
        quiz.setCompleted(false);
        quiz.setScore(0);
        
        Quiz savedQuiz = quizRepository.save(quiz);
        
        // Create questions
        List<QuizQuestion> questions = new ArrayList<>();
        for (Flashcard flashcard : selectedFlashcards) {
            QuizQuestion question = createQuestionFromFlashcard(flashcard, savedQuiz, flashcards);
            questions.add(question);
        }
        
        savedQuiz.setQuestions(questions);
        return quizRepository.save(savedQuiz);
    }
    
    /**
     * Creates a question from a flashcard with multiple-choice options
     */
    private QuizQuestion createQuestionFromFlashcard(Flashcard flashcard, Quiz quiz, List<Flashcard> allFlashcards) {
        QuizQuestion question = new QuizQuestion();
        
        // Create appropriate question text based on language
        if (flashcard.getLanguage() == Language.KOREAN || flashcard.getLanguage() == Language.IGBO) {
            question.setQuestion("What is '" + flashcard.getWord() + "' in " + 
                             flashcard.getLanguage().toString().charAt(0) + 
                             flashcard.getLanguage().toString().substring(1).toLowerCase() + "?");
        } else {
            question.setQuestion("What is the translation of: " + flashcard.getWord());
        }
        
        question.setCorrectAnswer(flashcard.getTranslation());
        question.setFlashcard(flashcard);
        question.setQuiz(quiz);
        
        // Generate options (including the correct answer)
        List<String> options = new ArrayList<>();
        options.add(flashcard.getTranslation());
        
        // Add incorrect options
        List<Flashcard> otherFlashcards = allFlashcards.stream()
                .filter(f -> !f.getId().equals(flashcard.getId()))
                .collect(Collectors.toList());
        
        Collections.shuffle(otherFlashcards);
        
        // Add up to 3 more options (or fewer if not enough flashcards)
        for (int i = 0; i < Math.min(3, otherFlashcards.size()); i++) {
            options.add(otherFlashcards.get(i).getTranslation());
        }
        
        // Shuffle options
        Collections.shuffle(options);
        question.setOptions(options);
        
        return quizQuestionRepository.save(question);
    }
    
    /**
     * Gets a quiz by its ID
     */
    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Quiz not found with id: " + id));
    }
    
    /**
     * Gets all quizzes for a specific language
     */
    public List<Quiz> getQuizzesByLanguage(Language language) {
        return quizRepository.findByLanguage(language);
    }
    
    /**
     * Gets all quizzes
     */
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }
    
    /**
     * Submits an answer for a quiz question
     */
    @Transactional
    public boolean submitAnswer(Long quizId, Long questionId, String userAnswer) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new IllegalArgumentException("Quiz not found with id: " + quizId));
        
        QuizQuestion question = quiz.getQuestions().stream()
                .filter(q -> q.getId().equals(questionId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Question not found in quiz"));
        
        question.setUserAnswer(userAnswer);
        boolean isCorrect = userAnswer.equals(question.getCorrectAnswer());
        question.setIsCorrect(isCorrect);
        
        quizQuestionRepository.save(question);
        
        // Update quiz score if all questions are answered
        updateQuizStatus(quiz);
        
        return isCorrect;
    }
    
    /**
     * Updates the quiz status and score when all questions are answered
     */
    private void updateQuizStatus(Quiz quiz) {
        boolean allAnswered = quiz.getQuestions().stream()
                .allMatch(q -> q.getUserAnswer() != null);
        
        if (allAnswered) {
            quiz.setCompleted(true);
            
            // Calculate score
            long correctCount = quiz.getQuestions().stream()
                    .filter(q -> Boolean.TRUE.equals(q.getIsCorrect()))
                    .count();
            
            quiz.setScore((int) correctCount);
            quizRepository.save(quiz);
        }
    }
    
    /**
     * Evaluates a quiz and returns the score
     */
    public int evaluateQuiz(Long quizId) {
        Quiz quiz = getQuizById(quizId);
        
        if (!quiz.getCompleted()) {
            throw new IllegalStateException("Quiz is not completed yet");
        }
        
        return quiz.getScore();
    }
}