import React, { useState } from 'react';
import '../assets/styles/uploadpage.css';
import { Label } from "@fluentui/react-components";
import axios from 'axios';

function UploadPage() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = new URLSearchParams();
    body.append('name', name);
    body.append('desc', desc);
    body.append('img', img);
    body.append('installer', localStorage.getItem('user') as string);

    try {
      const response = await axios.post('http://localhost:8000/tasks/create-task', body, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      alert(response.data.message);
    } catch {
      alert("An unexpected error has occurred.");
    }
  };

  return (
    <div className='uploadholder'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Name and Description</legend>
          <Label htmlFor='media-name'>Media's name</Label>
          <input id='media-name' type='text' onChange={(e) => setName(e.target.value)} required/>

          <Label htmlFor='media-description'>Description</Label>
          <textarea id='media-description' onChange={(e) => setDesc(e.target.value)} required></textarea>
        </fieldset>

        <fieldset>
          <legend>Upload Media</legend>
          
          <Label htmlFor="file">Upload File</Label>
          <input 
            id="file" 
            name="media" 
            type="file" 
            accept="image/png, image/jpeg" 
          />

          <Label htmlFor="url">or Add URL</Label>
          <input 
            id="url" 
            name="media" 
            type="text" 
            placeholder="Alternatively add URL" 
            pattern="https?://.+" 
            onChange={(e) => setImg(e.target.value)}
          />
        </fieldset>

        <input type='submit' value="Upload"/>
      </form>
    </div>
  )
}

export default UploadPage;