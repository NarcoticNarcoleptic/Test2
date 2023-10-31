import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { saveAs } from 'file-saver';

const SendGitHubRepo = () => {
  const [githubUrl, setGithubUrl] = useState('');
  const [output, setOutput] = useState('');
  const [textFileName, setTextFileName] = useState('');

  const handleGithubUrlChange = (event) => {
    setGithubUrl(event.target.value);
  };

  const handleProcessGithubRepo = () => {
    axios
      .post('http://localhost:5000/process_github_repo', { repo_url: githubUrl })
      .then((response) => {
        setOutput(response.data.output);

        if (response.data.output) {
          // Send a request to download the temp_clone.txt file
          axios
            .get(response.data.output, { responseType: 'blob' })
            .then((fileResponse) => {
              const blob = new Blob([fileResponse.data], { type: 'text/plain;charset=utf-8' });
              saveAs(blob, 'textfiles/temp_clone.txt');
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRequestTextFile = () => {
    if (textFileName) {
      // Send a GET request to fetch the specified text file
      axios
        .get(`/fetch_text_file/${textFileName}`)
        .then((response) => {
          if (response.status === 200) {
            // Handle success, e.g., show a success message
            console.log(`${textFileName} fetched and saved successfully`);
          } else {
            // Handle errors, e.g., show an error message
            console.error(`Failed to fetch and save ${textFileName}`);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Handle the case when textFileName is empty
      console.error('Text file name is empty.');
    }
  };
  
  const handleTextFileNameChange = (event) => {
    setTextFileName(event.target.value);
  };

  return (
    <div>
      <TextField
        label="GitHub Repository URL"
        variant="outlined"
        value={githubUrl}
        onChange={handleGithubUrlChange}
        fullWidth
        style={{ marginBottom: '16px' }}
      />
      <Button variant="contained" color="primary" onClick={handleProcessGithubRepo}>
        Process GitHub Repo
      </Button>
      <div>
        
        
      </div>
      <pre style={{ marginTop: '16px' }}>{output}</pre>
    </div>
  );
};

export default SendGitHubRepo;
