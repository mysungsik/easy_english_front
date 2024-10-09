import {Route, Routes} from 'react-router-dom';
import Login from "./pages/login/login"
import Signup from "./pages/signup/signup"
import MyAccount from "./pages/mypage/my-account"
import Dashboard from "./pages/dashboard/dashboard"
import LearnToday from './pages/learn/learn-today';

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
      </Routes>
    </div>
  );
}

export default App;
