import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutMe from './AboutMe';
import InvestmentCalculator from './InvestmentCalculator';
import './App.css';

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route exact path="/" element={<AboutMe/>} />
            <Route exact path="/InvestmentCalculator" element={<InvestmentCalculator/>} />
            <Route exact path="/OtherProjects" element={<h1>Coming Soon...</h1>} />
        </Routes>
    </Router>
  );
}

export default App;