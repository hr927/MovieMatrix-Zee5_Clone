
import { Link } from "react-router-dom";
import logo from "./logo.svg";


// import "./App.css";


// import "./App.css";

// import './App.css';

import AllRoutes from "./Routes/AllRoutes";

function App() {
  return (
    <div className="App">
      <AllRoutes />
      {/* <Link to="profile-page">Profile Page</Link> */}
      <Link to="profile">Profile</Link>
    </div>
  );
}

export default App;
