package com.koribo_backend.service;

import com.koribo_backend.model.Category;
import com.koribo_backend.model.ContentSection;
import com.koribo_backend.model.ContentSectionType;
import com.koribo_backend.model.Lesson;
import com.koribo_backend.model.Module;
import com.koribo_backend.repository.CategoryRepository;
import com.koribo_backend.repository.ContentSectionRepository;
import com.koribo_backend.repository.LessonRepository;
import com.koribo_backend.repository.ModuleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class LessonServiceTest {

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private ModuleRepository moduleRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ContentSectionRepository contentSectionRepository;

    @InjectMocks
    private LessonService lessonService;

    private Module testModule;
    private Lesson testLesson;
    private Category testCategory;
    private ContentSection testContentSection;

    @BeforeEach
    void setUp() {
        // Setup test module
        testModule = new Module();
        testModule.setId(1L);
        testModule.setName("Test Module");

        // Setup test category
        testCategory = new Category();
        testCategory.setId(1L);
        testCategory.setName("Test Category");

        // Setup test content section
        testContentSection = new ContentSection();
        testContentSection.setId(1L);
        testContentSection.setType(ContentSectionType.STORY);
        testContentSection.setText("Test content");

        // Setup test lesson
        testLesson = new Lesson();
        testLesson.setId(1L);
        testLesson.setTitle("Test Lesson");
        testLesson.setDescription("Test Description");
        testLesson.setModule(testModule);
        testLesson.setContentSections(new ArrayList<>(Arrays.asList(testContentSection)));
    }

    @Test
    void getAllLessons_ShouldReturnAllLessons() {
        // Arrange
        when(lessonRepository.findAll()).thenReturn(Arrays.asList(testLesson));

        // Act
        List<Lesson> lessons = lessonService.getAllLessons();

        // Assert
        assertNotNull(lessons);
        assertEquals(1, lessons.size());
        assertEquals(testLesson.getTitle(), lessons.get(0).getTitle());
        verify(lessonRepository).findAll();
    }

    @Test
    void getLessonsByModule_ShouldReturnModuleLessons() {
        // Arrange
        when(lessonRepository.findByModuleId(1L)).thenReturn(Arrays.asList(testLesson));

        // Act
        List<Lesson> lessons = lessonService.getLessonsByModule(1L);

        // Assert
        assertNotNull(lessons);
        assertEquals(1, lessons.size());
        assertEquals(testLesson.getTitle(), lessons.get(0).getTitle());
        verify(lessonRepository).findByModuleId(1L);
    }

    @Test
    void getLessonById_ShouldReturnLesson() {
        // Arrange
        when(lessonRepository.findById(1L)).thenReturn(Optional.of(testLesson));

        // Act
        Optional<Lesson> lesson = lessonService.getLessonById(1L);

        // Assert
        assertTrue(lesson.isPresent());
        assertEquals(testLesson.getTitle(), lesson.get().getTitle());
        verify(lessonRepository).findById(1L);
    }

    @Test
    void createLesson_ShouldCreateNewLesson() {
        // Arrange
        when(moduleRepository.findById(1L)).thenReturn(Optional.of(testModule));
        when(lessonRepository.save(any(Lesson.class))).thenReturn(testLesson);

        // Act
        Lesson createdLesson = lessonService.createLesson(1L, testLesson);

        // Assert
        assertNotNull(createdLesson);
        assertEquals(testLesson.getTitle(), createdLesson.getTitle());
        assertEquals(testModule, createdLesson.getModule());
        verify(moduleRepository).findById(1L);
        verify(lessonRepository).save(any(Lesson.class));
    }

    @Test
    void createLesson_WithInvalidModuleId_ShouldThrowException() {
        // Arrange
        when(moduleRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            lessonService.createLesson(999L, testLesson);
        });
    }

    @Test
    void updateLesson_ShouldUpdateExistingLesson() {
        // Arrange
        Lesson updatedLesson = new Lesson();
        updatedLesson.setTitle("Updated Title");
        updatedLesson.setDescription("Updated Description");

        when(lessonRepository.findById(1L)).thenReturn(Optional.of(testLesson));
        when(lessonRepository.save(any(Lesson.class))).thenReturn(testLesson);

        // Act
        Lesson result = lessonService.updateLesson(1L, updatedLesson);

        // Assert
        assertNotNull(result);
        assertEquals(updatedLesson.getTitle(), result.getTitle());
        assertEquals(updatedLesson.getDescription(), result.getDescription());
        verify(lessonRepository).findById(1L);
        verify(lessonRepository).save(any(Lesson.class));
    }

    @Test
    void updateLesson_WithInvalidId_ShouldThrowException() {
        // Arrange
        when(lessonRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            lessonService.updateLesson(999L, testLesson);
        });
    }

    @Test
    void deleteLesson_ShouldDeleteLesson() {
        // Act
        lessonService.deleteLesson(1L);

        // Assert
        verify(lessonRepository).deleteById(1L);
    }
} 