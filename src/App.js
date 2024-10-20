import {Route, Routes} from 'react-router-dom';
import Login from "./pages/login/login"
import Signup from "./pages/signup/signup"
import Dashboard from "./pages/dashboard/dashboard"
import LearnToday from './pages/learn/learn-today';
import Adminpage from './pages/admin/adminpage';

function App() {  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/learn/*">
          <Route path='today' element={<LearnToday/>}></Route>
        </Route>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/admin" element={<Adminpage/>} />
      </Routes>
    </div>
  );
}

export default App;
