import React, { useState } from 'react';

const FileUploadTest = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!isUploading && selectedFile) {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log('File uploaded successfully.');
          } else {
            console.error('Failed to upload file.');
          }
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        })
        .finally(() => {
          setUploading(false);
        });
    } else if (isUploading) {
      console.log('Already uploading...');
    } else {
      console.error('No file selected.');
    }
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isUploading}>
        Upload File
      </button>
    </div>
  );
};

export default FileUploadTest;
