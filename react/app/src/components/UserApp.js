import React, { Component } from 'react';
import UserList from "./UserList";
import UserEdit from "./UserEdit";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class UserApp extends Component {
	render() {
		return (
			<Router>
			<>
			<h1>User Application</h1>
				<Switch>
					<Route path="/" exact component={UserList} />
					<Route path="/users" exact component={UserList} />
					<Route path="/users/:id" component={UserEdit} />
				</Switch>
				</>
			</Router>
		)
	}
}

export default UserApp
