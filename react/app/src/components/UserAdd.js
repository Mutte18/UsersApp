import React, { Component } from "react";
import UserDataService from "../service/UserDataService";

export default class UserAdd extends Component {
	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangeAge = this.onChangeAge.bind(this);
		this.newUser = this.newUser.bind(this);
		this.saveUser = this.saveUser.bind(this);

		this.state = {
			id: null,
			name: "",
			email: "",
			age: '',

			submitted: false
		};
	}

	onChangeName(e) {
		this.setState({
			name: e.target.value
		});
	}

	onChangeEmail(e) {
		this.setState({
			email: e.target.value
		});
	}

	onChangeAge(e) {
		this.setState({
			age: e.target.value
		});
	}

	saveUser() {
		console.log(this, "SAVEUSER");
		let data = {
			name: this.state.name,
			email: this.state.email,
			age: this.state.age
		};

		UserDataService.createUser(data)
			.then(response => {
				this.setState({
					id: response.data.id,
					name: response.data.name,
					email: response.data.email,
					age: response.data.age,

					submitted: true
				});
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			});
	}

	newUser() {
		this.setState({
			id: null,
			name: "",
			email: "",
			age: '',

			submitted: false
		});
	}

	render() {
		return (
			<div className="submit-form">
				{this.state.submitted ? (
					<div>
						<h4>User created successfully!</h4>
						<button className="btn btn-success" onClick={this.newUser}>
							Add another user
						</button>
					</div>
				) : (
					<div>
						<h4>Add User</h4>
						<div className="form-group">
							<label htmlFor="title">Name</label>
							<input
								type="text"
								className="form-control"
								id="name"
								required
								value={this.state.name}
								onChange={this.onChangeName}
								name="name"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								className="form-control"
								id="email"
								required
								value={this.state.email}
								onChange={this.onChangeEmail}
								name="email"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="age">Age</label>
							<input
								type="number"
								className="form-control"
								id="age"
								required
								value={this.state.age}
								onChange={this.onChangeAge}
								name="age"
							/>
						</div>

						<button onClick={this.saveUser} className="btn btn-success">
							Submit
						</button>
					</div>
				)}
			</div>
		);
	}
}
