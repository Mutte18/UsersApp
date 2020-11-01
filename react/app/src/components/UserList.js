import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserDataService from "../service/UserDataService";

export default class UserList extends Component {
	constructor(props) {
		super(props);
		this.getUsers = this.getUsers.bind(this);
		this.refreshList = this.refreshList.bind(this);
		this.setActiveUser = this.setActiveUser.bind(this);

		this.state = {
			users: [],
			currentUser: null,
			currentIndex: -1,
		};
	}

	componentDidMount() {
		this.getUsers();
	}

	getUsers() {
		UserDataService.getAllUsers()
			.then(response => {
				this.setState({
					users: response.data
				});
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			});
	}

	refreshList() {
		this.getUsers();
		this.setState({
			currentUser: null,
			currentIndex: -1
		});
	}

	setActiveUser(user, index) {
		this.setState({
			currentUser: user,
			currentIndex: index
		});
	}

	render() {
		const { users, currentUser, currentIndex } = this.state;

		return (
			<div className="list row">
				<div className="col-md-6">
					<h4>Users List</h4>

					<ul className="list-group">
						{users &&
						users.map((user, index) => (
							<li
								className={
									"list-group-item " +
									(index === currentIndex ? "active" : "")
								}
								onClick={() => this.setActiveUser(user, index)}
								key={index}
							>
								{user.name}
							</li>
						))}
					</ul>

				</div>
				<div className="col-md-6">
					{currentUser ? (
						<div>
							<h4>User #{currentUser.id}</h4>
							<div>
								<label>
									<strong>Name:</strong>
								</label>{" "}
								{currentUser.name}
							</div>
							<div>
								<label>
									<strong>Email:</strong>
								</label>{" "}
								{currentUser.email}
							</div>
							<div>
								<label>
									<strong>Age:</strong>
								</label>{" "}
								{currentUser.age}
							</div>

							<Link
								to={"/users/" + currentUser.id}
								className="badge badge-warning"
							>
								Edit
							</Link>
						</div>
					) : (
						<div>
							<br />
							<p>Please click on a User...</p>
						</div>
					)}
				</div>
			</div>
		);
	}
}
