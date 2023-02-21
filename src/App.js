import './App.css';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Home from './components/Home';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Chatroom from './components/Chatroom';

function App(){
  return(
    <div className={"App"}>
      <div className={"App-header"}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/room/:id' element={<Chatroom />} />
            <Route path='/group/:id' element={<Chatroom />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
