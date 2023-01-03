import './App.css';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import Home from './components/Home';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Home />
      </header>
    </div>
  );
}

export default App;
