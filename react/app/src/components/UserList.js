import React, { Component } from 'react';
import UserDataService from "../service/UserDataService";

class UserList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			users: [],
			message: null
		};
		this.refreshUsers = this.refreshUsers.bind(this);
		this.deleteUserClicked = this.deleteUserClicked.bind(this);
		this.updateUserClicked = this.updateUserClicked.bind(this);
		this.addUserClicked = this.addUserClicked.bind(this);

	}

	componentDidMount() {
		this.refreshUsers();
	}

	refreshUsers() {
		UserDataService.getAllUsers()
			.then(
				response => {
					this.setState({ users: response.data })
					console.log(response);
				}
			)
	}

	deleteUserClicked(id) {
		UserDataService.deleteUser(id)
			.then(
				response => {
					this.setState({ message: `Delete of user ${id} Successful` })
					this.refreshUsers()
				}
			)
	}

	updateUserClicked(id) {
		this.props.history.push(`/users/${id}`)
	}

	addUserClicked() {
		this.props.history.push(`/users/-1`)

	}

	render() {
		return (
			<div className="container">
				<h3>All Users</h3>
				{this.state.message && <div class="alert alert-success">{this.state.message}</div>}
				<div className="container">
					<table className="table">
						<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Age</th>
							<th>Email</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
						</thead>
						<tbody>
						{
							this.state.users.map(
								user =>
									<tr key={user.id}>
										<td>{user.id}</td>
										<td>{user.name}</td>
										<td>{user.age}</td>
										<td>{user.email}</td>
										<td><button className="btn btn-success"
										            onClick={() => this.updateUserClicked(user.id)}>Update</button>
										</td>
										<td><button className="btn btn-warning"
										            onClick={() => this.deleteUserClicked(user.id)}>Delete</button>
										</td>

									</tr>
							)
						}
						</tbody>
					</table>
					<div className="row">
						<button className="btn btn-success" onClick={this.addUserClicked}>Add User</button>
					</div>
				</div>
			</div>
		)
	}
}
export default UserList;

