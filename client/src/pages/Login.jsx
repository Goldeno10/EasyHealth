import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import image from "../images/registerimg.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import jwt_decode from "jwt-decode";
import fetchData from "../helper/apiCall";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Login() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [formDetails, setFormDetails] = useState({
		regnum: "",
		password: "",
	});
	const navigate = useNavigate();

	const inputChange = (e) => {
		const { name, value } = e.target;
		return setFormDetails({
			...formDetails,
			[name]: value,
		});
	};

	const formSubmit = async (e) => {
		try {
			e.preventDefault();
			const { regnum, password } = formDetails;
			if (!regnum || !password) {
				return toast.error("Input field should not be empty");
			} else if (password.length < 5) {
				return toast.error("Password must be at least 5 characters long");
			}

			const { data } = await toast.promise(
				axios.post("/user/login", {
					regnum,
					password,
				}),
				{
					pending: "Logging in...",
					success: "Login successfully",
					error: "Unable to login user",
					loading: "Logging user...",
				}
			);
			localStorage.setItem("token", data.token);
			dispatch(setUserInfo(jwt_decode(data.token).userId));
			getUser(jwt_decode(data.token).userId);
		} catch (error) {
			return error;
		}
	};

	const getUser = async (id) => {
		try {
			const temp = await fetchData(`/user/getuser/${id}`);
			dispatch(setUserInfo(temp));
			return navigate("/");
		} catch (error) {
			return error;
		}
	};

	return (
		<section className="register-section">
			<div className="register-container flex-center">
				<div className="register-card">
					<h3 className="easyhealth">easyHealth</h3>
					<h1 className="form-heading">Log In</h1>
					<form onSubmit={formSubmit} className="register-form">
						<div className="input-field">
							<div className="label">Reg number</div>
							<input
								type="text"
								name="regnum"
								className="form-input"
								placeholder=""
								value={formDetails.regnum}
								onChange={inputChange}
							/>
						</div>

						<div className="input-field">
							<div className="label">Password</div>
							<input
								type="text"
								name="password"
								className="form-input"
								placeholder=""
								value={formDetails.password}
								onChange={inputChange}
							/>
						</div>

						<button
							type="submit"
							className="btn button"
							disabled={loading ? true : false}
						>
							<span className="button-label">Log in</span>
						</button>
					</form>
					<p className="already-have-an-container">
						Don't have an account?{" "}
						<NavLink className="login-link" to={"/register"}>
							Sign up
						</NavLink>
					</p>
				</div>
			</div>
			<img className="register-child" loading="lazy" alt="" src={image} />
		</section>
	);
}

export default Login;
