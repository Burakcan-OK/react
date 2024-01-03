import {Route, BrowserRouter as Router,Routes,} from "react-router-dom"
import './App.css';
import "./lib/fontawesome/css/all.min.css"
import Header from './components/Header';
import Watclist from './components/Watchlist'
import Watched from "./components/Watched";
import Add from "./components/Add";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Watclist/>} />
          <Route path="/watched" element={<Watched/>} />
          <Route path="/add" element={<Add/>} />
        </Routes>
      </Router>
    </GlobalProvider>
  
  );
}

export default App;
