import '../assets/styles/input.css';

// Set up inputs for component
interface InputProps {
  label: string;
  inputType?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function Input({label, inputType = 'text', placeholder = '', onChange}: InputProps){

  // Send signal to parent when component's value is changed
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div>
      <label>{label}</label>
      <input 
        type={inputType}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}