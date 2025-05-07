import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FlashcardPage from './pages/FlashcardPage';
import SingleFlashcard from './pages/SingleFlashcard';
import "./App.css"
import Navbar from './pages/Navbar'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/koribo" element={<Home />} />
          <Route path="/koribo/flashcards" element={<FlashcardPage />} />
          <Route path="/koribo/flashcards/:id" element={<SingleFlashcard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
