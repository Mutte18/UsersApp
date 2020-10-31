import React, { Component } from 'react';
import { Container, Form, FormGroup, Input, Label } from 'reactstrap';
import UserDataService from "../service/UserDataService";
import {ErrorMessage, Field, Formik} from "formik";

class UserEdit extends Component {
	constructor(props) {
		super(props)

		this.state = {
			id: this.props.match.params.id,
			name: '',
			email: '',
			age: ''
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.validate = this.validate.bind(this)


	}

	onSubmit(values) {
		let user = {
			id: this.state.id,
			name: values.name,
			email: values.name,
			age: values.age
		};

		if (this.state.id === -1) {
			UserDataService.createUser(user)
				.then(() => this.props.history.push('/users'))
		} else {
			UserDataService.updateUser(this.state.id, user)
				.then(() => this.props.history.push('/users'))
		}
	}

	validate(values) {
		console.log(values, "hej validate");
		console.log(values.name);
		let errors = {};
		if (!values.name || values.name === '') {
			errors.name = 'Enter a name'
		} else if (values.name.length < 2) {
			errors.name = 'Enter a name longer than 2 characters!'
		}
		console.log(errors, "errors");
		return errors
	}

	componentDidMount() {
		if (this.state.id == -1) {
			return
		}



		UserDataService.getUser(this.state.id)
			.then(response => this.setState({
				name: response.data.name,
				email: response.data.email,
				age: response.data.age,
			}))
	}

	render() {
		let {id, name, email, age} = this.state;
		console.log(id, name, email, age);
		return (
			<div>
				<h3>Course</h3>
				<div className="container">
					<Formik initialValues={{
						id: id,
						name: name,
						email: email,
						age: age }}
						enableReinitialize={true}
			      onSubmit={this.onSubmit}
            validateOnChange={true}
            validateOnBlur={true}
            validate={this.validate}
					>
						{
							(props
							) => (
								<Form>
									<ErrorMessage name="description" component="div"
									              className="alert alert-warning" />
									<fieldset className="form-group">
										<label>Id</label>
										<Field className="form-control" type="text" name="id" disabled/>
									</fieldset>
									<fieldset className="form-group">
										<label>Name</label>
										<Field className="form-control" type="text" name="name"/>
									</fieldset>
									<fieldset className="form-group">
										<label>Email</label>
										<Field className="form-control" type="text" name="email"/>
									</fieldset>
									<fieldset className="form-group">
										<label>Age</label>
										<Field className="form-control" type="number" name="age"/>
									</fieldset>
									<button className="btn btn-success" type="submit">Save</button>
								</Form>
							)
						}
					</Formik>
				</div>
			</div>
		)
	}
}

export default UserEdit;
