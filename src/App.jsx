import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import { SignInForm, SignUpForm } from "./components/AuthForms";
import Hero from "./components/Hero";
import AllParts from "./components/AllParts";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/all-parts" element={<AllParts />} />
          <Route path='/hero' element={<Hero/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
