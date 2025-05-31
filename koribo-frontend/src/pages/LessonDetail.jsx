import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLessonById } from '../services/Lesson';
import { getContentSectionsByLesson } from '../services/ContentSection';
import '../styles/LessonDetail.css';

const LessonDetail = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [contentSections, setContentSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('content');
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessonData, sectionsData] = await Promise.all([
          getLessonById(lessonId),
          getContentSectionsByLesson(lessonId)
        ]);
        console.log('Fetched lesson data:', lessonData);
        console.log('Fetched content sections:', sectionsData);
        setLesson(lessonData);
        setContentSections(sectionsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load lesson. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [lessonId]);

  const handlePreviousContent = () => {
    setCurrentContentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextContent = () => {
    setCurrentContentIndex(prev => Math.min(contentSections.length - 1, prev + 1));
  };

  if (loading) {
    return <div className="loading">Loading lesson...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!lesson) {
    return <div className="error">Lesson not found</div>;
  }

  const renderContentSection = (section, index) => {
    console.log('Rendering section:', section);
    switch (section.type) {
      case 'STORY':
      case 'CULTURAL_NOTE':
        return (
          <div key={section.id || index} className={`content-section ${section.type.toLowerCase()}`}>
            <div className="section-content">{section.text}</div>
            {section.imageUrl && (
              <div className="section-image">
                <img src={section.imageUrl} alt={`Lesson content ${index + 1}`} />
              </div>
            )}
            {section.audioUrl && (
              <div className="section-audio">
                <audio controls>
                  <source src={section.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        );
      default:
        console.log('Unknown section type:', section.type);
        return null;
    }
  };

  return (
    <div className="lesson-detail">
      <div className="lesson-header">
        <div className="lesson-header-content">
          <div className="lesson-meta">
            <span className="lesson-module">{lesson.module?.name}</span>
            <span className="lesson-language">{lesson.language}</span>
          </div>
          <h1>{lesson.title}</h1>
          <p>{lesson.description}</p>
        </div>
      </div>

      <div className="lesson-container">
        <div className="lesson-sidebar">
          <div className="sidebar-section">
            <h3>Lesson Sections</h3>
            <div className="section-tabs">
              <button 
                className={`tab-button ${activeSection === 'content' ? 'active' : ''}`}
                onClick={() => setActiveSection('content')}
              >
                Content
                {contentSections && (
                  <span className="section-count">{contentSections.length}</span>
                )}
              </button>
              <button 
                className={`tab-button ${activeSection === 'flashcards' ? 'active' : ''}`}
                onClick={() => setActiveSection('flashcards')}
              >
                Flashcards
                {lesson.flashcards && (
                  <span className="section-count">{lesson.flashcards.length}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="lesson-content">
          {activeSection === 'content' && (
            <div className="content-sections">
              {contentSections && contentSections.length > 0 ? (
                <div className="content-navigation">
                  <button 
                    className="nav-button prev"
                    onClick={handlePreviousContent}
                    disabled={currentContentIndex === 0}
                  >
                    ← Previous
                  </button>
                  <div className="content-display">
                    {renderContentSection(contentSections[currentContentIndex], currentContentIndex)}
                    <div className="content-progress">
                      {currentContentIndex + 1} / {contentSections.length}
                    </div>
                  </div>
                  <button 
                    className="nav-button next"
                    onClick={handleNextContent}
                    disabled={currentContentIndex === contentSections.length - 1}
                  >
                    Next →
                  </button>
                </div>
              ) : (
                <div className="no-content">No content sections available for this lesson.</div>
              )}
            </div>
          )}

          {activeSection === 'flashcards' && (
            <div className="flashcards-section">
              {lesson.flashcards && lesson.flashcards.length > 0 ? (
                <div className="flashcards-grid">
                  {lesson.flashcards.map((flashcard, index) => (
                    <div key={flashcard.id} className="flashcard-card">
                      <div className="flashcard-front">
                        <h4>{flashcard.word}</h4>
                        <p className="flashcard-language">{flashcard.language}</p>
                      </div>
                      <div className="flashcard-back">
                        <h4>{flashcard.translation}</h4>
                        <p className="flashcard-category">{flashcard.category?.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-content">No flashcards available for this lesson.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;