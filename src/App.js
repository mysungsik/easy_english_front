import {Route, Routes} from 'react-router-dom';
import { useContext } from 'react';
import UserContext from './context/userContext';

import PageAdmin from './pages/admin/page-admin';
import PageLogin from "./pages/login/page-login"
import PageSignup from "./pages/signup/page-signup"
import PageDashboard from "./pages/dashboard/page-dashboard"
import PageLearnToday from './pages/learn/page-learn-today';
import PageLearnReview from './pages/learn/page-learn-review';
import PageRepeatNote from './pages/repeat/page-repeat-note';
import PageUFOGame from './pages/game/page-ufo-game';
import PageWordRain from './pages/game/page-rain-game'



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
            <Route path='repeatNote' element={<PageRepeatNote user={user}/>}></Route>
        </Route>
        <Route path='/game/*'>
            <Route path='rain' element={<PageWordRain/>}></Route>
            <Route path='ufo' element={<PageUFOGame/>}></Route>
        </Route>
        <Route path="/dashboard" element={<PageDashboard/>} />
        <Route path="/admin" element={<PageAdmin/>} />
      </Routes>
    </div>
  );
}

export default App;
