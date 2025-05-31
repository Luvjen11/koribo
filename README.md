# Koribo - Igbo And Korean Language Learning Platform

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Requirements](#requirements)
- [Core Features](#core-features)
- [Data Models](#data-models)
- [User Story](#user-story)
- [API Endpoints](#api-endpoints)

## Project Overview

### Concept
Koribo is an interactive language learning platform designed to make learning the Igbo and Korean language engaging, accessible, and fun. Through storytelling, flashcards, and quizzes, users embark on a journey to learn Igbo and Korean in an intuitive way.

### Why?
Many language learning apps focus on mainstream languages, leaving indigenous African languages like Igbo underrepresented. Traditional language learning methods can be dry and disconnected from cultural context. Koribo addresses this gap by providing a platform specifically designed for Igbo language learners, incorporating cultural stories and interactive elements to make learning meaningful and engaging.
And Korean because I wish to learn korean and connect with a different culture from mine.

### How?
- **Storytelling Approach**: Users learn through narrative-driven modules that follow characters on cultural adventures
- **Progressive Learning Path**: Content is structured in modules with ordered lessons that build upon previous knowledge
- **Flashcard System**: Interactive flashcards help users memorize vocabulary and phrases
- **Cultural Context**: Lessons incorporate cultural elements, traditions, and historical context
- **Interactive Quizzes**: Test knowledge through dynamically generated quizzes based on learned content

## Technologies Used

### Backend
- **Spring Boot**: Java-based framework for building the RESTful API
- **Spring Data JPA**: Simplifies database operations and ORM
- **Hibernate**: ORM for mapping Java objects to database tables
- **MySQL**: Relational database for storing user data, lessons, and progress
- **Lombok**: Reduces boilerplate code for model classes
- **Jackson**: JSON serialization/deserialization for API responses

### Frontend (React)
- **React**: JavaScript library for building the user interface
- **React Router**: Handles navigation between different components
- **Axios**: HTTP client for making API requests
- **CSS/SCSS**: Styling the application components
- **Vite**: Build tool and development server

## Installation & Setup

### Prerequisites
- Java 17 or higher
- Node.js 14 or higher
- MySQL 8.0 or higher
- Maven

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/koribo.git
   cd koribo/koribo-backend
   ```

2. Create a MySQL database:
   ```bash
   mysql -u root -p
   CREATE DATABASE koribo;
   exit
   ```

3. Configure database connection in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/koribo
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

4. Build and run the backend:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../koribo-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Requirements

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- Minimum 2GB RAM
- 500MB free disk space

### User Requirements
- Basic computer literacy
- Interest in learning the Igbo language and Korean language

## Core Features

### MVP (Minimum Viable Product)
- Module-based learning structure with progressive lessons
- Interactive story-based lessons with cultural context
- Flashcard system for vocabulary practice
- Dynamic quiz generation based on learned content
- Progress tracking and completion status
- Category-based organization of flashcards

### Post-MVP Features
- Audio pronunciation guides
- User progress analytics
- Social features for language exchange
- Mobile application
- Offline mode support

## Data Models

### Module
- Represents a collection of related lessons
- Contains metadata like name, description, and language
- Maintains ordered list of lessons
- Supports both Igbo and Korean language tracks

### Lesson
- Contains story-based content and cultural notes
- Includes multimedia elements (images, audio)
- Associated with a specific module
- Contains a set of flashcards for vocabulary practice
- Tracks completion status and progress

### ContentSection
- Embedded within lessons
- Supports different types (STORY, CULTURAL_NOTE)
- Contains rich text content (up to 4000 characters)
- Can include images and audio references

### Flashcard
- Contains word and translation
- Associated with a category and optional lesson
- Supports multiple languages (Igbo, Korean)
- Includes context and mnemonic aids
- Can have associated images and audio

### Category
- Organizes flashcards by topic or theme
- Unique name constraint
- Bidirectional relationship with flashcards
- Automatically created for lesson-specific vocabulary

### Quiz
- Dynamically generated from flashcards
- Supports multiple-choice questions
- Tracks completion status and score
- Language-specific quiz generation
- Randomizes question order and options

## User Story

1. **Module Selection**: Users browse available modules based on their interests or skill level
2. **Lesson Progression**: Users work through lessons in sequential order, unlocking new content as they progress
3. **Story Learning**: Users engage with cultural stories and notes to learn language in context
4. **Vocabulary Practice**: Users review flashcards to reinforce vocabulary learning
5. **Knowledge Testing**: Users take quizzes to test their understanding
6. **Progress Tracking**: Users can view their learning statistics and track their progress
7. **Category Organization**: Users can browse flashcards by categories for focused study

## API Endpoints

### Modules
- `GET /koribo/modules` - Get all modules
- `GET /koribo/modules/{id}` - Get a specific module by ID
- `POST /koribo/modules` - Create a new module (admin only)
- `PUT /koribo/modules/{id}` - Update a module (admin only)
- `DELETE /koribo/modules/{id}` - Delete a module (admin only)

### Lessons
- `GET /koribo/lessons` - Get all lessons
- `GET /koribo/lessons?moduleId={moduleId}` - Get lessons by module ID
- `GET /koribo/lessons/{id}` - Get a specific lesson by ID
- `POST /koribo/lessons?moduleId={moduleId}` - Create a new lesson (admin only)
- `PUT /koribo/lessons/{id}` - Update a lesson (admin only)
- `DELETE /koribo/lessons/{id}` - Delete a lesson (admin only)

### Flashcards
- `GET /koribo/flashcards` - Get all flashcards
- `GET /koribo/flashcards?lessonId={lessonId}` - Get flashcards by lesson ID
- `GET /koribo/flashcards/{id}` - Get a specific flashcard by ID
- `POST /koribo/flashcards?lessonId={lessonId}` - Create a new flashcard 
- `PUT /koribo/flashcards/{id}` - Update a flashcard 
- `DELETE /koribo/flashcards/{id}` - Delete a flashcard 

### Categories
- `GET /koribo/categories` - Get all categories
- `GET /koribo/categories/{id}` - Get a specific category by ID
- `POST /koribo/categories` - Create a new category
- `PUT /koribo/categories/{id}` - Update a category
- `DELETE /koribo/categories/{id}` - Delete a category

### Quizzes
- `GET /koribo/quizzes` - Get all quizzes
- `GET /koribo/quizzes/{id}` - Get a specific quiz by ID
- `POST /koribo/quizzes` - Create a new quiz
- `PUT /koribo/quizzes/{id}` - Update a quiz
- `DELETE /koribo/quizzes/{id}` - Delete a quiz

### User Progress
- `GET /koribo/progress` - Get current user's progress
- `POST /koribo/progress/lesson/{lessonId}` - Mark a lesson as completed
- `GET /koribo/progress/module/{moduleId}` - Get progress for a specific module

---

Koribo is an ongoing project aimed at preserving and promoting the Igbo language through interactive digital learning. Contributions and feedback are welcome!

## Testing

### Backend Testing
The backend uses JUnit 5 and Mockito for testing. Tests are organized by layer:

- Service Layer Tests: Test business logic in isolation using mocks
- Repository Layer Tests: Test database operations
- Controller Layer Tests: Test API endpoints

To run the tests:
```bash
cd koribo-backend
mvn test
```

### Test Structure
- Unit Tests: Test individual components in isolation
- Integration Tests: Test component interactions
- Test Coverage: Aim for high test coverage, especially for critical business logic

### Writing Tests
1. Service Layer Tests:
   - Use `@Mock` for dependencies
   - Use `@InjectMocks` for the service being tested
   - Follow AAA pattern (Arrange, Act, Assert)
   - Test both success and failure scenarios

2. Repository Layer Tests:
   - Use `@DataJpaTest` for repository tests
   - Test CRUD operations
   - Test custom queries

3. Controller Layer Tests:
   - Use `@WebMvcTest` for controller tests
   - Test HTTP methods and responses
   - Test request validation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Commit your changes
5. Push to the branch
6. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
