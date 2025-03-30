import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FlashcardPage from './pages/FlashcardPage';
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
        </Routes>
      </Router>
    </>
  )
}

export default App
