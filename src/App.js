import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./screens/Signin";
import SignUp from "./screens/Signup";
import Home from "./screens/Home";
import "./App.css";



function App() {
const email = localStorage.getItem("email");
return (
	<div className="App">
	<BrowserRouter>
		<Routes>
		<Route exact path="/" element={<SignIn />} />
		<Route path="/Signup" element={<SignUp />} />
		<Route
			path="/Home"
			element={email ? <Home /> : <Navigate to="" />}
		/>
		</Routes>
	</BrowserRouter>
  
	</div>



);
}

export default App;
