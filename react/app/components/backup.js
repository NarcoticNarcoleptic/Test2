import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Paper, Button } from '@mui/material';

const ApiRequest = () => {
  const [userQuestion, setUserQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/ask"; // Correct the endpoint URL

  useEffect(() => {
    // Function to make the API request
    const sendQuestion = async () => {
      try {
        const data = { question: userQuestion };

        // Send the POST request to the API using Axios
        const response = await axios.post(API_URL, data);

        if (response.status === 200) {
          setAnswer(response.data);
        } else {
          setError("Failed to get an answer from the API.");
        }
      } catch (error) {
        setError("Failed to get an answer from the API.");
      }
    };

    // Handle Enter key press to send the question
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        sendQuestion();
      }
    };

    // Attach the event listener for Enter key press
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [userQuestion]);

  return (
    <div>
      <h1>Chat Window</h1>
      <Paper elevation={3} style={{ padding: '16px', maxWidth: '400px' }}>
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
