import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, TextField } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

  const renderBotResponse = () => {
    if (error) {
      return (
        <div>
          <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>
        </div>
      );
    } else if (answer) {
      return (
        <div>
          <p><strong>Bot:</strong></p>
          <ReactMarkdown
            components={{
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={materialLight}
                    language={match[1]}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {answer.answer || 'No answer provided'}
          </ReactMarkdown>
        </div>
      );
    } else {
      return null;
    }
  };

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
          {renderBotResponse()}
        </div>
      </Paper>
    </div>
  );
};

export default ApiRequest;
