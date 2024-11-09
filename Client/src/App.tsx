import './assets/styles/index.css';
import { NavBar } from './components';

function App() {
    // Function for switching active view
    function handleViewChange(newView: string){
        switch (newView) {
            case 'tasks':
                break;
            case 'upload':
                break;
            case 'users':
                break;
        }
    }    

    return (
        <main>
            <NavBar changeView={handleViewChange}/>
            <div className='window-content'>
                asdadasdasd
            </div>
        </main>
    );
}

export default App;