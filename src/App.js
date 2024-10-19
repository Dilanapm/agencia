import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import store from './store';
import { Provider } from 'react-redux';
import Error404 from './containers/errors/Error404';
import Home from './containers/pages/Home';
import RegisterForm from 'containers/pages/RegisterForm';
function App() {
  return (
    <Provider store={store} >
    <Router>
      <Routes>
        <Route path="*" element={<Error404 />}/>
        <Route path="/" element={<RegisterForm/>}/>

      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
