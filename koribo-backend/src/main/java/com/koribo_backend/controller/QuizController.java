package com.koribo_backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.koribo_backend.model.Language;
import com.koribo_backend.model.Quiz;
import com.koribo_backend.model.QuizQuestion;
import com.koribo_backend.service.QuizService;

@RestController
@CrossOrigin("*")
@RequestMapping("/koribo/quizzes")
public class QuizController {
    
    @Autowired
    private QuizService quizService;
    
    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody Map<String, Object> request) {
        try {
            Language language = Language.valueOf((String) request.get("language"));
            Integer numberOfQuestions = (Integer) request.get("numberOfQuestions");
            
            Quiz quiz = quizService.createQuiz(language, numberOfQuestions);
            return ResponseEntity.status(HttpStatus.CREATED).body(quiz);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        try {
            Quiz quiz = quizService.getQuizById(id);
            return ResponseEntity.ok(quiz);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Quiz>> getQuizzesByLanguage(
            @RequestParam(required = false) Language language) {
        if (language == null) {
            // If no language is specified, return all quizzes
            return ResponseEntity.ok(quizService.getAllQuizzes());
        }
        
        List<Quiz> quizzes = quizService.getQuizzesByLanguage(language);
        return ResponseEntity.ok(quizzes);
    }
    
    @PostMapping("/{quizId}/submit")
    public ResponseEntity<Map<String, Object>> submitAnswer(
            @PathVariable Long quizId,
            @RequestBody Map<String, Object> request) {
        try {
            Long questionId = Long.valueOf(request.get("questionId").toString());
            String userAnswer = (String) request.get("userAnswer");
            
            boolean isCorrect = quizService.submitAnswer(quizId, questionId, userAnswer);
            
            // Get the correct answer
            Quiz quiz = quizService.getQuizById(quizId);
            String correctAnswer = quiz.getQuestions().stream()
                    .filter(q -> q.getId().equals(questionId))
                    .findFirst()
                    .map(QuizQuestion::getCorrectAnswer)
                    .orElse("");
            
            Map<String, Object> response = Map.of(
                "isCorrect", isCorrect,
                "correctAnswer", correctAnswer
            );
            
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{quizId}/evaluate")
    public ResponseEntity<Map<String, Object>> evaluateQuiz(@PathVariable Long quizId) {
        try {
            int score = quizService.evaluateQuiz(quizId);
            Quiz quiz = quizService.getQuizById(quizId);
            
            Map<String, Object> response = Map.of(
                "quizId", quizId,
                "language", quiz.getLanguage(),
                "totalQuestions", quiz.getNumberOfQuestions(),
                "score", score,
                "percentage", (double) score / quiz.getNumberOfQuestions() * 100
            );
            
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}