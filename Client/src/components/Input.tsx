import React, { useState, useEffect } from 'react';

interface InputProps {
  label: string;
  inputType?: string;
  onChange: (value: string) => void;
}

export function Input({label, inputType = 'text', onChange}: InputProps){

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div>
      <label>{label}</label>
      <input 
        type={inputType}
        onChange={handleChange}
      />
    </div>
  );
}