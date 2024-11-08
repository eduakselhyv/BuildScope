import '../assets/styles/navbar.css';

interface InputProps {
    username: string;
    changeView: (value: string) => void;
}

export function NavBar({ changeView, username }: InputProps) {
  function handleClick(value: string) {
    changeView(value);
  }

  return (
    <div className="navbar">
      <h1>BuildScope</h1>
      <nav>
        <div onClick={() => handleClick('tasks')}>Tasks</div>
        <div onClick={() => handleClick('upload')}>Upload</div>
        <div onClick={() => handleClick('users')}>Users</div>
      </nav>
      <div className='usercontent'>
        <div className='user'>
          {username}
        </div>
      </div>
    </div>
  );
}