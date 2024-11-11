import React from 'react';
import '../assets/styles/uploadpage.css';

function UploadPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    
    // Function for sending task to server

    alert(`Successfully uploaded task!`);
  };

  return (
    <div className='uploadholder'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='media-name'>Media's name</label>
        <input id='media-name' type='text' required/>

        <label htmlFor='media-description'>Description</label>
        <textarea id='media-description' required></textarea>

        <label htmlFor='media'>Media</label>
        <input type='file' accept="image/png, image/jpeg" required/>

        <input type='submit' value="Upload"/>
      </form>
    </div>
  )
}

export default UploadPage;