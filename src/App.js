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
import PageDailyColumn from './pages/dailyColumn/page-daily-column';



function App() {  
  const {user} = useContext(UserContext);

  return (
    <div className="App bg-linear__b_llblue">
      <Routes>
        <Route path="/" element={<PageDashboard/>}></Route>
        <Route path="/login" element={<PageLogin/>}></Route>
        <Route path="/signup" element={<PageSignup/>}></Route>
        <Route path="/learn/*">
            <Route path='today' element={<PageLearnToday user={user}/>}></Route>
            <Route path='review' element={<PageLearnReview user={user}/>}></Route>
            <Route path='repeatNote' element={<PageRepeatNote user={user}/>}></Route>
            <Route path='dailyColumn' element={<PageDailyColumn user={user}/>}></Route>
        </Route>
        <Route path='/game/*'>
            <Route path='rain' element={<PageWordRain user={user}/>}></Route>
            <Route path='ufo' element={<PageUFOGame user={user}/>}></Route>
        </Route>
        <Route path="/dashboard" element={<PageDashboard/>} />
        <Route path="/admin" element={<PageAdmin/>} />
      </Routes>
    </div>
  );
}

export default App;
