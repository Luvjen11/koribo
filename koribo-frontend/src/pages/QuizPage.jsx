import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizById, submitAnswer, evaluateQuiz } from "../services/Quiz";
import "../styles/QuizPage.css";

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const data = await getQuizById(id);
      setQuiz(data);
      
      // Initialize selected answers based on existing user answers from backend
      const initialAnswers = {};
      data.questions.forEach(question => {
        initialAnswers[question.id] = question.userAnswer || "";
      });
      setSelectedAnswers(initialAnswers);
    } catch (error) {
      setError(error.message || "Failed to load quiz");
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = async (questionId, answer) => {
    try {
      setSubmittingAnswer(true);
      
      // Update local state first for immediate UI feedback
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: answer
      });
      
      // Submit answer to backend
      await submitAnswer(quiz.id, questionId, answer);
      
      // Refresh quiz data to get updated state from server
      await fetchQuiz();
    } catch (error) {
      console.error("Error submitting answer:", error);
      setError("Failed to submit answer. Please try again.");
    } finally {
      setSubmittingAnswer(false);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      setEvaluating(true);
      
      // Call the evaluate endpoint
      const results = await evaluateQuiz(quiz.id);
      setQuizResults(results);
      setQuizSubmitted(true);
    } catch (error) {
      console.error("Error evaluating quiz:", error);
      setError("Failed to submit quiz. Please try again.");
    } finally {
      setEvaluating(false);
    }
  };

  const isQuizComplete = () => {
    return Object.values(selectedAnswers).every(answer => answer !== "");
  };

  if (loading) {
    return (
      <div className="quiz-page">
        <div className="container">
          <div className="loading">Loading quiz...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-page">
        <div className="container">
          <div className="error-message">{error}</div>
          <button 
            className="back-btn" 
            onClick={() => navigate("/koribo/quizzes/new")}
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  if (quizSubmitted && quizResults) {
    return (
      <div className="quiz-page">
        <div className="container">
          <div className="quiz-results">
            <h1 className="page-title">Quiz Results</h1>
            <div className="score-container">
              <div className="score">{quizResults.percentage.toFixed(0)}%</div>
              <p className="score-text">
                You got {quizResults.score} out of {quizResults.totalQuestions} questions correct!
              </p>
            </div>
            
            <div className="questions-review">
              <h2>Review Your Answers</h2>
              {quiz.questions.map((question, index) => (
                <div 
                  key={question.id} 
                  className={`question-review ${question.isCorrect ? "correct" : "incorrect"}`}
                >
                  <h3>Question {index + 1}: {question.question}</h3>
                  <p>Your answer: {question.userAnswer || "Not answered"}</p>
                  <p>Correct answer: {question.correctAnswer}</p>
                </div>
              ))}
            </div>
            
            <div className="quiz-actions">
              <button 
                className="back-btn" 
                onClick={() => navigate("/koribo/quizzes/new")}
              >
                Take Another Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="quiz-page">
      <div className="container">
        <div className="quiz-header">
          <h1 className="page-title">{quiz.language} Quiz</h1>
          <div className="quiz-progress">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
        </div>
        
        <div className="question-container">
          <h2 className="question-text">{currentQuestion.question}</h2>
          
          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={index} 
                className={`option ${selectedAnswers[currentQuestion.id] === option ? "selected" : ""}`}
                onClick={() => !submittingAnswer && handleAnswerSelect(currentQuestion.id, option)}
              >
                {option}
              </div>
            ))}
          </div>
          
          {submittingAnswer && <div className="submitting-message">Saving your answer...</div>}
          
          <div className="navigation-buttons">
            <button 
              className="nav-btn prev-btn" 
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0 || submittingAnswer}
            >
              Previous
            </button>
            
            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <button 
                className="nav-btn submit-btn" 
                onClick={handleSubmitQuiz}
                disabled={!isQuizComplete() || submittingAnswer || evaluating}
              >
                {evaluating ? "Submitting..." : "Submit Quiz"}
              </button>
            ) : (
              <button 
                className="nav-btn next-btn" 
                onClick={goToNextQuestion}
                disabled={submittingAnswer}
              >
                Next
              </button>
            )}
          </div>
        </div>
        
        <div className="question-dots">
          {quiz.questions.map((question, index) => (
            <div 
              key={index} 
              className={`dot ${index === currentQuestionIndex ? "active" : ""} ${
                question.userAnswer ? "answered" : ""
              }`}
              onClick={() => !submittingAnswer && setCurrentQuestionIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;