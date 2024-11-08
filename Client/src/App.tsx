import './assets/styles/index.css';
import { NavBar } from './components';

function App() {
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
            <NavBar username='idk' changeView={handleViewChange}/>
        </main>
    );
}

export default App;