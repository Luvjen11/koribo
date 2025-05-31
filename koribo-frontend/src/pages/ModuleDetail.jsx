import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getModuleById, getLessonsByModuleId } from '../services/Module';
import '../styles/ModuleDetail.css';

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModuleAndLessons = async () => {
      try {
        const moduleData = await getModuleById(moduleId);
        setModule(moduleData);
        
        const lessonsData = await getLessonsByModuleId(moduleId);
        setLessons(Array.isArray(lessonsData) ? lessonsData : []);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching module details:', error);
        setError('Failed to load module. Please try again later.');
        setLoading(false);
      }
    };

    fetchModuleAndLessons();
  }, [moduleId]);

  if (loading) {
    return <div className="loading">Loading module...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!module) {
    return <div className="error">Module not found</div>;
  }

  return (
    <div className="module-detail">
      <div 
        className="module-header" 
        style={{ backgroundImage: `url(/images/modules/${module.id}.jpg)` }}
      >
        <div className="module-header-content">
          <div className="module-meta">
            <span className="module-level">MODULE {module.orderIndex}</span>
            <span className="module-language">{module.language}</span>
          </div>
          <h1>{module.name}</h1>
          <p>{module.description}</p>
          {lessons.length > 0 && (
            <Link to={`/koribo/lessons/${lessons[0].id}`} className="start-learning-button">
              Start Learning
            </Link>
          )}
        </div>
      </div>
      
      <div className="lessons-container">
        <div className="lessons-header">
          <h2>Lessons</h2>
          <p className="lessons-description">
            {module.language === 'IGBO' 
              ? 'Learn Igbo through engaging stories and cultural context'
              : 'Master Korean with structured lessons and practical examples'}
          </p>
        </div>
        <div className="lessons-list">
          {lessons.map((lesson, index) => (
            <Link 
              to={`/koribo/lessons/${lesson.id}`} 
              className="lesson-card" 
              key={lesson.id}
            >
              <div className="lesson-number">{index + 1}</div>
              <div className="lesson-info">
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
                {lesson.contentSections && lesson.contentSections.length > 0 && (
                  <div className="lesson-content-preview">
                    <span className="content-count">
                      {lesson.contentSections.length} {lesson.contentSections.length === 1 ? 'section' : 'sections'}
                    </span>
                    {lesson.flashcards && (
                      <span className="flashcard-count">
                        {lesson.flashcards.length} {lesson.flashcards.length === 1 ? 'flashcard' : 'flashcards'}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="lesson-status">
                {lesson.completed ? (
                  <span className="completed">Completed</span>
                ) : (
                  <button className="start-button">Start</button>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;