import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllModules } from '../services/Module';
import '../styles/Module.css';

const Modules = () => {
  console.log("Modules component rendering"); // Add this for debugging
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Modules useEffect running");
    const fetchModules = async () => {
      try {
        // For testing, let's add some mock data if the API call fails
        let data;
        try {
          data = await getAllModules();
        } catch (apiError) {
          console.error("API error:", apiError);
          // Mock data as fallback
          data = [
            { 
              id: 1, 
              name: "Basics of Igbo", 
              description: "Learn the fundamentals of Igbo language", 
              orderIndex: 1 
            },
            { 
              id: 2, 
              name: "Greetings and Introductions", 
              description: "Learn how to greet people and introduce yourself", 
              orderIndex: 2 
            }
          ];
        }
        
        console.log("Modules data:", data);
        setModules(data);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetchModules:", error);
        setError('Failed to load modules. Please try again later.');
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  if (loading) {
    return <div className="loading">Loading modules...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="modules-dashboard">
      <div className="dashboard-header">
        <h1>The Journey of Igbo</h1>
        <p>Embark on an adventure to learn Igbo, a beautiful language with rich cultural heritage.</p>
      </div>
      
      <div className="modules-container">
        {modules && modules.length > 0 ? (
          modules.map((module) => (
            <div className="module-card" key={module.id}>
              <div className="module-image" style={{ backgroundImage: `url(/images/modules/${module.id}.jpg)` }}></div>
              <div className="module-info">
                <span className="module-level">MODULE {module.orderIndex}</span>
                <h2>{module.name}</h2>
                <p>{module.description}</p>
                <div className="module-progress">
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '0%' }}></div>
                  </div>
                  <span>0% Complete</span>
                </div>
                <Link to={`/koribo/modules/${module.id}`} className="start-button">
                  Start Learning
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-modules">
            <p>No modules available. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modules;