import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import axios from "axios";
import toast from "react-hot-toast";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import fetchData from "../helper/apiCall";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Profile() {
	const { userId } = jwt_decode(localStorage.getItem("token"));
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.root);
	const [file, setFile] = useState("");
	const [formDetails, setFormDetails] = useState({
		fullname: "",
		regnum: "",
		email: "",
		age: "",
		mobile: "",
		gender: "neither",
		address: "",
		// pic: "",
	});

	const onUpload = async (element) => {
		setLoading(true);
		if (element.type === "image/jpeg" || element.type === "image/png") {
			const data = new FormData();
			data.append("file", element);
			data.append("upload_preset", "zfu2ifld");
			data.append("cloud_name", "dbflml7ce");
			// data.append("api_key", "7zvSoDVtdAgviD3UHqmdCOg_0Tw");
			fetch("https://api.cloudinary.com/v1_1/dbflml7ce/image/upload", {
				method: "POST",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data.url.toString());
					setFile(data.url.toString());
				});
			setLoading(false);
			// console.log("file url", file);
		} else {
			setLoading(false);
			toast.error("Please select an image in jpeg or png format");
		}
	};

	const getUser = async () => {
		try {
			dispatch(setLoading(true));
			const temp = await fetchData(`/user/getuser/${userId}`);
			setFormDetails({
				...temp,
				// password: "",
				// confpassword: "",
				mobile: temp.mobile === null ? "" : temp.mobile,
				age: temp.age === null ? "" : temp.age,
				pic
			});
			setFile(temp.pic);
			console.log("temp pic", temp.pic);
			dispatch(setLoading(false));
		} catch (error) {}
	};

	useEffect(() => {
		getUser();
	}, [dispatch]);

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
			const {
				fullname,
				regnum,
				email,
				age,
				mobile,
				address,
				gender,
				pic,
				// password,
				// confpassword,
			} = formDetails;

			if (!email) {
				return toast.error("Email should not be empty");
			} else if (fullname.length < 3) {
				return toast.error("Fullname must be at least 3 characters long");
			} else if (regnum.length < 5) {
				return toast.error(
					"registration number must be at least 5 characters long"
				);
			}
			// } else if (password.length < 0) {
			// 	return toast.error("Password must be at least 5 characters long");
			// } else if (password !== confpassword) {
			// 	return toast.error("Passwords do not match");
			// }
			console.log("file url", file);
			await toast.promise(
				axios.put(
					"/user/updateprofile",
					{
						fullname,
						regnum,
						age,
						mobile,
						address,
						gender,
						email,
						// password,
						pic: file,
					},
					{
						headers: {
							authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				),
				{
					pending: "Updating profile...",
					success: "Profile updated successfully",
					error: "Unable to update profile",
					loading: "Updating profile...",
				}
			);

			setFormDetails({ ...formDetails });
		} catch (error) {
			return toast.error("Unable to update profile");
		}
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<section className="register-section flex-center">
					<div className="profile-container flex-center">
						<h2 className="form-heading">Profile</h2>
						<img src={file} alt="profile" className="profile-pic" />
						<form onSubmit={formSubmit} className="register-form">
							<div className="input-field">
								{/* <div className="label">Profile picture</div> */}
								<input
									type="file"
									onChange={(e) => onUpload(e.target.files[0])}
									name="profile-pic"
									id="profile-pic"
									className="form-input"
								/>
							</div>{" "}
							<div className="form-same-row">
								<input
									type="text"
									name="fullname"
									className="form-input"
									placeholder="Enter your full name"
									value={formDetails.fullname}
									onChange={inputChange}
								/>
								<input
									type="text"
									name="regnum"
									className="form-input"
									placeholder="Enter your reg number"
									value={formDetails.regnum}
									onChange={inputChange}
								/>
							</div>
							<div className="form-same-row">
								<input
									type="email"
									name="email"
									className="form-input"
									placeholder="Enter your email"
									value={formDetails.email}
									onChange={inputChange}
								/>
								<select
									name="gender"
									value={formDetails.gender}
									className="form-input"
									id="gender"
									onChange={inputChange}
								>
									<option value="neither">Prefer not to say</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>
							</div>
							<div className="form-same-row">
								<input
									type="text"
									name="age"
									className="form-input"
									placeholder="Enter your age"
									value={formDetails.age}
									onChange={inputChange}
								/>
								<input
									type="text"
									name="mobile"
									className="form-input"
									placeholder="Enter your mobile number"
									value={formDetails?.mobile}
									onChange={inputChange}
								/>
							</div>
							<textarea
								type="text"
								name="address"
								className="form-input"
								placeholder="Enter your address"
								value={formDetails.address}
								onChange={inputChange}
								rows="2"
							></textarea>
							{/* <div className="form-same-row">
								<input
									type="password"
									name="password"
									className="form-input"
									placeholder="Enter your password"
									value={formDetails.password}
									onChange={inputChange}
								/>
								<input
									type="password"
									name="confpassword"
									className="form-input"
									placeholder="Confirm your password"
									value={formDetails.confpassword}
									onChange={inputChange}
								/>
							</div> */}
							<button type="submit" className="btn form-btn">
								update
							</button>
						</form>
					</div>
				</section>
			)}
		</>
	);
}

export default Profile;
