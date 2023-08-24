import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Header } from './components/Header';
import { Body } from './components/Body';
import { NftDetail } from './components/NftDetail';
import { CreateNft } from './components/CreateNft';
import { Profile } from './components/Profile';

function App() {
  return (
    <div className=" bg-gray-950 ">
      <Router>
        <Header />
        <Routes>
          <Route path="/home" element={<Body />} />
          <Route path="/nftdetail/:id" element={<NftDetail />} />
          <Route path="/create" element={<CreateNft />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/home" replace={true} />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
