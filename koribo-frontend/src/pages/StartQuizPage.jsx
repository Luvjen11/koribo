import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../services/Quiz";
import "../styles/StartQuizPage.css";

function StartQuizPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("IGBO");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const quizData = {
        language,
        numberOfQuestions
      };

      const createdQuiz = await createQuiz(quizData);
      navigate(`/koribo/quizzes/${createdQuiz.id}`);
    } catch (error) {
      setError(error.message || "Failed to create quiz");
      console.error("Error creating quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="start-quiz-page">
      <div className="container">
        <div className="quiz-header">
          <h1 className="page-title">Start a New Quiz</h1>
          <p className="quiz-description">
            Test your knowledge with a quiz! Select your preferences below.
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="quiz-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="language">Language:</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            >
              <option value="KOREAN">Korean</option>
              <option value="IGBO">Igbo</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="numberOfQuestions">Number of Questions:</label>
            <select
              id="numberOfQuestions"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
              required
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="start-quiz-btn"
            disabled={loading}
          >
            {loading ? "Creating Quiz..." : "Start Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StartQuizPage;