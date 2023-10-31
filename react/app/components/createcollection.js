import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const API_URL = 'http://localhost:5000/create_collection';  // Replace with your API endpoint

const cardStyle = {
  maxWidth: 400,
  margin: 'auto',
  marginTop: 16,
  whiteSpace: 'pre-wrap',
  maxHeight: '300px',
  overflowY: 'auto',
};

function CreateCollectionComponent() {
  const [collectionName, setCollectionName] = useState('');
  const [responseText, setResponseText] = useState(null);
  const [isRequestSent, setRequestSent] = useState(false);

  const handleCollectionNameChange = (event) => {
    setCollectionName(event.target.value);
  };

  const sendRequest = async () => {
    if (collectionName) {
      try {
        setRequestSent(true);

        const requestData = { collection_name: collectionName };
        console.log('Request Data:', requestData);

        const response = await fetch(API_URL, {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const responseText = await response.text();

        if (response.status === 200) {
          setResponseText(responseText.replace(/\n/g, '<br />'));
        } else {
          console.error('Failed to create the Qdrant collection.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setRequestSent(false);
      }
    } else {
      console.error('Collection name is required.');
    }
  };

  return (
    <div>
      <TextField
        label="Collection Name"
        variant="outlined"
        value={collectionName}
        onChange={handleCollectionNameChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={sendRequest}
        disabled={isRequestSent}
      >
        {isRequestSent ? 'Creating Collection...' : 'Create Collection'}
      </Button>
      {responseText && (
        <Card variant="outlined" style={cardStyle}>
          <CardContent>
            <p>Response from the API:</p>
            <div dangerouslySetInnerHTML={{ __html: responseText }} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default CreateCollectionComponent;
