import * as React from "react";
import { loadBlockchainData, loadWeb3 } from "../Web3helpers";
import { useNavigate } from "react-router-dom";
import "../App.css"

export default function SignIn() {
const [email, setEmail] = React.useState("");
const [password, setPassword] = React.useState("");
const navigate = useNavigate();

const [accounts, setAccounts] = React.useState(null);
const [auth, setAuth] = React.useState(null);

const loadAccounts = async () => {
	let { auth, accounts } = await loadBlockchainData();

	setAccounts(accounts);
	setAuth(auth);
};

const login = async () => {
	if (!email || !password) {
	alert("please fill all details");

	return;
	}

	try {
	const res = await auth.methods.usersList(email).call();

	if (res.password === password) {
		localStorage.setItem("email", email);
		localStorage.setItem("account", accounts);
		window.location.href= '/Home';
	} else {
		alert("wrong user credentials or please signup");
	}
	} catch (error) {
	alert(error.message);
	}
};

React.useEffect(() => {
	loadWeb3();
}, []);

React.useEffect(() => {
	loadAccounts();
}, []);

return (
	<div class="logo" style={rootDiv}>
		<div className="flex flex-col bg-white border-2 border-violet-500 p-10 rounded-lg">
			<div className="flex flex-col justify-center items-center mb-5">
				<div className="signbox h-20"></div>
				<h2 className="title-font font-bold text-2xl text-violet-500">BlockWeb</h2>
			</div>
	<h2 className="font-title font-bold text-left text-4xl mb-4">Login</h2>
	<input
		style={input}
		value={email}
		className="focus:border-2 focus:border-violet-500 border-solid"
		onChange={(e) => setEmail(e.target.value)}
		placeholder="Email"
		type="text"
	/>
	<input
		style={input}
		value={password}
		onChange={(e) => setPassword(e.target.value)}
		placeholder="Password"
		type="password"
	/>
	<button className="hover:bg-violet-600" style={button} onClick={login}>
		{" "}
		Sign In
	</button>

	<span
	className="text-gray-900 underline"
		style={{ cursor: "pointer" }}
		onClick={() => {
		navigate("/Signup");
		}}
	>
		{" "}
		Create new account{" "}
	</span>
	</div>
	</div>
);
}

const rootDiv = {
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
height: "100vh",
};

const input = {
width: 300,
padding: 10,
margin: 10,
borderRadius: 10,
outline: "none",
border: "2px solid grey",
fontSize: 17,
};

const button = {
width: 325,
padding: 10,
borderRadius: 10,
margin: 10,
cursor: "pointer",
fontSize: 17,
color: "white",
backgroundColor: "#9D27CD",
border: "none",
};

const image = {
width: 70,
height: 70,
objectFit: "contain",
borderRadius: 70,
};
