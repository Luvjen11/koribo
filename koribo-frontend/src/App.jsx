import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FlashcardPage from './pages/FlashcardPage';
import SingleFlashcard from './pages/SingleFlashcard';
import NewFlashcard from './pages/NewFlashcard';
import "./App.css"
import Navbar from './pages/Navbar'
import CategoriesPage from './pages/CategoriesPage';
import StartQuizPage from "./pages/StartQuizPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/koribo" element={<Home />} />
          <Route path="/koribo/flashcards" element={<FlashcardPage />} />
          <Route path="/koribo/flashcards/new" element={<NewFlashcard />} />
          <Route path="/koribo/flashcards/:id" element={<SingleFlashcard />} />
          <Route path="/koribo/categories" element={<CategoriesPage />} />
          <Route path="/koribo/quizzes" element={<StartQuizPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
