import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Header } from './components/Header';
import { Body } from './components/Body';

function App() {
  return (
    <div className=" bg-purple-900 h-screen">
      <Router>
        <Header />
        <Routes>
          <Route path="/home" element={<Body />} />
          {/* <Route path="/vesting" element={<VestingPage />} />
          <Route path="/claim" element={<Claim />} /> */}
          <Route path="*" element={<Navigate to="/home" replace={true} />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
