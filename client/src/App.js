import { Routes, Route} from 'react-router-dom'
import Actions from "./pages/actions/Actions";
import UpdateGuest from './pages/actions/UpdateGuest';
import Events from "./pages/events/Events";

function App() {
  return (
    <div >
      <Routes>
      <Route path='/' element={<Events/>}/>
      <Route path='/actions/:id' element={<Actions/>}/>
      <Route path='/update/:id' element={<UpdateGuest/>}/>
      </Routes>
    </div>
  );
}

export default App;
