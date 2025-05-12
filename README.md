# Koribo - Igbo And Korean Language Learning Platform

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Requirements](#requirements)
- [Core Features](#core-features)
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
- Flashcard system for vocabulary practice
- Quizzes created based on the flashcards
- Progress tracking

### Post-MVP Features
- Module-based learning structure
- Lesson content with cultural context
- Audio pronunciation guides

## User Story

1. **Registration**: New users create an account to access the learning platform
2. **Module Selection**: Users browse available modules based on their interests or skill level
3. **Lesson Progression**: Users work through lessons in sequential order, unlocking new content as they progress
4. **Vocabulary Practice**: Users review flashcards to reinforce vocabulary learning
5. **Progress Review**: Users can view their learning statistics and track their progress
6. **Cultural Immersion**: Users gain cultural context through stories and historical information

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user and receive JWT token

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

### User Progress
- `GET /koribo/progress` - Get current user's progress
- `POST /koribo/progress/lesson/{lessonId}` - Mark a lesson as completed
- `GET /koribo/progress/module/{moduleId}` - Get progress for a specific module

---

Koribo is an ongoing project aimed at preserving and promoting the Igbo language through interactive digital learning. Contributions and feedback are welcome!
