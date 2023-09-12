import './App.css';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Navbar from './containers/navbar/Navbar';
import Home from './containers/Home/Home';
import Footer from './containers/Footer/Footer';
import Login from './containers/Login/Login';
import Prediction from './containers/Prediction/Prediction';
import News from './containers/News/News';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/predictions' element={<Prediction />}/>
          <Route exact path='/news' element={<News />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
