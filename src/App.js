import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import store from './store';
import { Provider } from 'react-redux';
import Error404 from './containers/errors/Error404';
import Home from './containers/pages/Home';
import RegisterForm from 'containers/pages/RegisterForm';
import Adoption from 'containers/pages/Adoption';
import Donation from 'containers/pages/Donation';
import Curiosities from 'containers/pages/Curiosities';
import Contact from 'containers/pages/Contact';
import Login from 'containers/pages/Login';
function App() {
  return (
    <Provider store={store} >
    <Router>
      <Routes>
        <Route path="*" element={<Error404 />}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/adoptar" element={<Adoption/>}/>
        <Route path="/donacion" element={<Donation/>}/>
        <Route path="/curiosidades" element={<Curiosities/>}/>
        <Route path="/contactar" element={<Contact/>}/>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
