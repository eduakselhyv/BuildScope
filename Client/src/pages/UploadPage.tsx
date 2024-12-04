import React, { useState } from 'react';
import '../assets/styles/uploadpage.css';
import { Label } from "@fluentui/react-components";
import axios from 'axios';

function UploadPage() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    if (file) {
      formData.append('img', file);
    }
    formData.append('installer', localStorage.getItem('user') as string);

    try {
      const response = await axios.post('http://localhost:8000/tasks/create-task', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.message) {
        alert(response.data.message);
      } else {
        alert("Upload successful");
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert("An unexpected error has occurred.");
    }
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
      setFile(event.target.files[0]);
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
            onChange={onImageChange}
          />
{/* 
          <Label htmlFor="url">or Add URL</Label>
          <input 
            id="url" 
            name="media" 
            type="text" 
            placeholder="Alternatively add URL" 
            pattern="https?://.+" 
            onChange={onImageChange}
          /> */}
          <img src={img} alt="preview image" className='file'/>
        </fieldset>

        <input type='submit' value="Upload"/>
      </form>
    </div>
  )
}

export default UploadPage;