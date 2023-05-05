import "./App.css";
import AllUsers from "./components/AllUsers";
import Header from './components/Header.jsx'
import Home from "./components/Home";
import UserRegistrationForm from "./UserRegistration/UserRegistration";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<AllUsers />}  />
        <Route path="/add" element={<UserRegistrationForm />}  />
        
      </Routes>
    </Router>
  );
}

export default App;
