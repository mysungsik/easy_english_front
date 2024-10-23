import {Route, Routes} from 'react-router-dom';
import PageLogin from "./pages/login/page-login"
import PageSignup from "./pages/signup/page-signup"
import PageDashboard from "./pages/dashboard/page-dashboard"
import PageLearnToday from './pages/learn/page-learn-today';
import PageAdmin from './pages/admin/page-admin';
import { useContext } from 'react';
import UserContext from './context/userContext';
import PageLearnReview from './pages/learn/page-learn-review';


function App() {  
  const {user} = useContext(UserContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PageDashboard/>}></Route>
        <Route path="/login" element={<PageLogin/>}></Route>
        <Route path="/signup" element={<PageSignup/>}></Route>
        <Route path="/learn/*">
          <Route path='today' element={<PageLearnToday user={user}/>}></Route>
          <Route path='review' element={<PageLearnReview user={user}/>}></Route>
        </Route>
        <Route path="/dashboard" element={<PageDashboard/>} />
        <Route path="/admin" element={<PageAdmin/>} />
      </Routes>
    </div>
  );
}

export default App;
