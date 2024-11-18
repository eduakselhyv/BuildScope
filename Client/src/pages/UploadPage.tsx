import React from 'react';
import '../assets/styles/uploadpage.css';
import { Label } from "@fluentui/react-components";

function UploadPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Function for sending task to server

    alert(`Successfully uploaded task!`);
  };

  return (
    <div className='uploadholder'>
      <form onSubmit={handleSubmit}>
        <Label htmlFor='media-name'>Media's name</Label>
        <input id='media-name' type='text' required/>

        <Label htmlFor='media-description'>Description</Label>
        <textarea id='media-description' required></textarea>

        <Label htmlFor='media'>Media</Label>
        <input type='file' accept="image/png, image/jpeg" required/>

        <input type='submit' value="Upload"/>
      </form>
    </div>
  )
}

export default UploadPage;