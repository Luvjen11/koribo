import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FlashcardPage from './pages/FlashcardPage';
import SingleFlashcard from './pages/SingleFlashcard';
import NewFlashcard from './pages/NewFlashcard';
import "./App.css"
import Navbar from './pages/Navbar'
import CategoriesPage from './pages/CategoriesPage';
import StartQuizPage from "./pages/StartQuizPage";
import QuizPage from "./pages/QuizPage";
import QuizHistoryPage from "./pages/QuizHistoryPage";
import Modules from "./pages/Modules";
import ModuleDetail from "./pages/ModuleDetail";
import LessonDetail from "./pages/LessonDetail";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/koribo" element={<Home />} />
            <Route path="/koribo/flashcards" element={<FlashcardPage />} />
            <Route path="/koribo/flashcards/new" element={<NewFlashcard />} />
            <Route path="/koribo/flashcards/:id" element={<SingleFlashcard />} />
            <Route path="/koribo/categories" element={<CategoriesPage />} />
            <Route path="/koribo/quizzes/new" element={<StartQuizPage />} />
            <Route path="/koribo/quizzes/:id" element={<QuizPage />} />
            <Route path="/koribo/quizzes" element={<QuizHistoryPage />} />
            <Route path="/koribo/modules" element={<Modules />} />
            <Route path="/koribo/modules/:moduleId" element={<ModuleDetail />} />
            
            {/* Add both route patterns for lessons */}
            <Route path="/koribo/lessons/:lessonId" element={<LessonDetail />} />
            <Route path="/lessons/:lessonId" element={<LessonDetail />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
