import React, { Component } from "react";
import UserDataService from "../service/UserDataService";

export default class UserEdit extends Component {
	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangeAge = this.onChangeAge.bind(this);
		this.getUser = this.getUser.bind(this);
		this.updateUser = this.updateUser.bind(this);
		this.deleteUser = this.deleteUser.bind(this);

		this.state = {
			currentUser: {
				id: null,
				name: "",
				email: "",
				age: false
			},
			message: ""
		};
	}

	componentDidMount() {
		this.getUser(this.props.match.params.id);
	}

	onChangeName(e) {
		const name = e.target.value;

		this.setState(function(prevState) {
			return {
				currentUser: {
					...prevState.currentUser,
					name: name
				}
			};
		});
	}

	onChangeEmail(e) {
		const email = e.target.value;

		this.setState(prevState => ({
			currentUser: {
				...prevState.currentUser,
				email: email
			}
		}));
	}

	onChangeAge(e) {
		const age = e.target.value;

		this.setState(prevState => ({
			currentUser: {
				...prevState.currentUser,
				age: age
			}
		}));
	}

	getUser(id) {
		UserDataService.getUser(id)
			.then(response => {
				this.setState({
					currentUser: response.data
				});
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			});
	}

	updateUser() {
		let data = {
			id: this.state.currentUser.id,
			name: this.state.currentUser.name,
			email: this.state.currentUser.email,
			age: this.state.currentUser.age,
		};

		UserDataService.updateUser(this.state.currentUser.id, data)
			.then(response => {
				this.setState(prevState => ({
					currentUser: {
						...prevState.currentUser,
					}
				}));
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			});
	}

	deleteUser() {
		UserDataService.deleteUser(this.state.currentUser.id)
			.then(response => {
				console.log(response.data);
				this.props.history.push('/users')
			})
			.catch(e => {
				console.log(e);
			});
	}

	render() {
		const { currentUser } = this.state;

		return (
			<div>
				{currentUser ? (
					<div className="edit-form">
						<h4>Edit User</h4>
						<form>
							<div className="form-group">
								<label htmlFor="name">Name</label>
								<input
									type="text"
									className="form-control"
									id="name"
									value={currentUser.name}
									onChange={this.onChangeName}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input
									type="text"
									className="form-control"
									id="email"
									value={currentUser.email}
									onChange={this.onChangeEmail}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="age">Age</label>
								<input
									type="text"
									className="form-control"
									id="age"
									value={currentUser.age}
									onChange={this.onChangeAge}
								/>
							</div>
						</form>

						<button
							className="badge badge-danger mr-2"
							onClick={this.deleteUser}
						>
							Delete
						</button>

						<button
							type="submit"
							className="badge badge-success"
							onClick={this.updateUser}
						>
							Update
						</button>
						<p>{this.state.message}</p>
					</div>
				) : (
					<div>
						<br />
						<p>Please click on a User...</p>
					</div>
				)}
			</div>
		);
	}
}
