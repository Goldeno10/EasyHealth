import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import image from "../images/registerimg.jpg";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Register() {
	const [file, setFile] = useState("");
	const [loading, setLoading] = useState(false);
	const [formDetails, setFormDetails] = useState({
		fullname: "",
		regnum: "",
		email: "",
		password: "",
		confpassword: "",
	});
	const navigate = useNavigate();

	const inputChange = (e) => {
		const { name, value } = e.target;
		return setFormDetails({
			...formDetails,
			[name]: value,
		});
	};

	const onUpload = async (element) => {
		setLoading(true);
		if (element.type === "image/jpeg" || element.type === "image/png") {
			const data = new FormData();
			data.append("file", element);
			data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
			data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
			fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
				method: "POST",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => setFile(data.url.toString()));
			setLoading(false);
		} else {
			setLoading(false);
			toast.error("Please select an image in jpeg or png format");
		}
	};

	const formSubmit = async (e) => {
		try {
			e.preventDefault();

			if (loading) return;
			// if (file === "") return;

			const { fullname, regnum, email, password, confpassword } = formDetails;
			if (!fullname || !regnum || !email || !password || !confpassword) {
				return toast.error("Input field should not be empty");
			} else if (fullname.length < 3) {
				return toast.error("Fullname must be at least 3 characters long");
			} else if (regnum.length < 3) {
				return toast.error(
					"registration number must be at least 5 characters long"
				);
			} else if (password.length < 5) {
				return toast.error("Password must be at least 5 characters long");
			} else if (password !== confpassword) {
				return toast.error("Passwords do not match");
			}

			await toast.promise(
				axios.post("/user/register", {
					fullname,
					regnum,
					email,
					password,
					// pic: file,
				}),
				{
					pending: "Registering user...",
					success: "User registered successfully",
					error: "Unable to register user",
					loading: "Registering user...",
				}
			);
			return navigate("/login");
		} catch (error) {}
	};

	return (
		<section className="register-section">
			<div className="register-container flex-center">
				<div className="register-card">
					<h3 className="easyhealth">easyHealth</h3>
					<h1 className="form-heading">Sign Up</h1>
					<form onSubmit={formSubmit} className="register-form">
						<div className="input-field">
							<div className="label">Full name</div>
							<input
								type="text"
								name="fullname"
								className="form-input"
								placeholder=""
								value={formDetails.fullname}
								onChange={inputChange}
							/>
						</div>

						<div className="input-field">
							<div className="label">Reg. No</div>
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
							<div className="label">Email</div>
							<input
								type="email"
								name="email"
								className="form-input"
								placeholder=""
								value={formDetails.email}
								onChange={inputChange}
							/>
						</div>
						{/* 
						<div className="input-field">
							<div className="label">Profile picture</div>
							<input
								type="file"
								onChange={(e) => onUpload(e.target.files[0])}
								name="profile-pic"
								id="profile-pic"
								className="form-input"
							/>
						</div> */}

						<div className="input-field">
							<div className="label">Password</div>
							<input
								type="password"
								name="password"
								className="form-input"
								placeholder=""
								value={formDetails.password}
								onChange={inputChange}
							/>
						</div>

						<div className="input-field">
							<div className="label">Confirm Password</div>
							<input
								type="password"
								name="confpassword"
								className="form-input"
								placeholder=""
								value={formDetails.confpassword}
								onChange={inputChange}
							/>
						</div>
						<button
							type="submit"
							className="btn button"
							disabled={loading ? true : false}
						>
							<span className="button-label">Create account</span>
						</button>
					</form>
					<p className="already-have-an-container">
						Already a have an account?{" "}
						<NavLink className="login-link" to={"/login"}>
							Log in
						</NavLink>
					</p>
				</div>
			</div>
			<img className="register-child" loading="lazy" alt="" src={image} />
		</section>
	);
}

export default Register;
