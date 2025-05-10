import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllQuizzes } from "../services/Quiz";
import "../styles/QuizHistoryPage.css";

// TODO: Add filter by language
function QuizHistoryPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    fetchQuizzes();
  }, [selectedLanguage]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const data = await getAllQuizzes(selectedLanguage || null);
      setQuizzes(data);
    } catch (error) {
      setError(error.message || "Failed to load quizzes");
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "high-score";
    if (score >= 60) return "medium-score";
    return "low-score";
  };

  if (loading) {
    return (
      <div className="quiz-history-page">
        <div className="container">
          <div className="loading">Loading quizzes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-history-page">
      <div className="container">
        <div className="quiz-history-header">
          <h1 className="page-title">Quiz History</h1>
          <p className="page-description">View your past quizzes and results</p>
          
          <div className="filter-controls">
            <div className="filter-group">
              <label htmlFor="language-filter">Filter by Language:</label>
              <select 
                id="language-filter" 
                value={selectedLanguage} 
                onChange={handleLanguageChange}
              >
                <option value="">All Languages</option>
                <option value="KOREAN">Korean</option>
                <option value="IGBO">Igbo</option>
              </select>
            </div>
          </div>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        {quizzes.length === 0 ? (
          <div className="no-quizzes">
            <p>No quizzes found. Take a quiz to see your history!</p>
            <Link to="/koribo/quizzes/new" className="take-quiz-btn">
              Take a Quiz
            </Link>
          </div>
        ) : (
          <div className="quiz-list">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="quiz-card">
                <div className="quiz-info">
                  <h2 className="quiz-language">{quiz.language} Quiz</h2>
                  <p className="quiz-date">Taken on: {formatDate(quiz.createdAt)}</p>
                  <p className="quiz-questions">
                    {quiz.numberOfQuestions} questions
                  </p>
                </div>
                
                <div className="quiz-result">
                  {quiz.completed ? (
                    <>
                      <div className={`quiz-score ${getScoreColor(quiz.score)}`}>
                        {Math.round((quiz.score / quiz.numberOfQuestions) * 100)}%
                      </div>
                      <p className="score-text">
                        {quiz.score} / {quiz.numberOfQuestions} correct
                      </p>
                    </>
                  ) : (
                    <div className="quiz-incomplete">Incomplete</div>
                  )}
                </div>
                
                <div className="quiz-actions">
                  <Link to={`/koribo/quizzes/${quiz.id}`} className="view-quiz-btn">
                    {quiz.completed ? "View Results" : "Continue Quiz"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="quiz-history-actions">
          <Link to="/koribo/quizzes/new" className="new-quiz-btn">
            Take a New Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuizHistoryPage;