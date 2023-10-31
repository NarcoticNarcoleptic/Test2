import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, TextField } from '@mui/material';

const ApiRequest = () => {
  const [userQuestion, setUserQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/ask"; // Correct the endpoint URL

  useEffect(() => {
    const sendQuestion = async () => {
      try {
        const data = { question: userQuestion };
        const response = await axios.post(API_URL, data);

        response.status === 200
          ? setAnswer(response.data)
          : setError("Failed to get an answer from the API");
      } catch {
        setError("Failed to get an answer from the API");
      }
    };

    const handleKeyPress = (e) => e.key === 'Enter' && sendQuestion();

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [userQuestion]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: '16px', maxWidth: '600px' }}>
        <h1 style={{ textAlign: 'center' }}>Chat Window</h1>
        <TextField
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          placeholder="Type your question and press Enter"
          fullWidth
        />
        <div>
          <p><strong>You:</strong> {userQuestion}</p>
          {error ? (
            <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>
          ) : (
            answer && (
              <div>
                <p><strong>Bot:</strong> {answer.answer || 'No answer provided'}</p>
              </div>
            )
          )}
        </div>
      </Paper>
    </div>
  );
};

export default ApiRequest;