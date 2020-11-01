import React, { Component } from "react";
import {Switch, Route, Link, BrowserRouter} from "react-router-dom";
import UserList from "./components/UserList";
import UserEdit from "./components/UserEdit";
import UserAdd from "./components/UserAdd";
import "./style/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add User
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/users"]} component={UserList} />
              <Route exact path="/add" component={UserAdd} />
              <Route path="/users/:id" component={UserEdit} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App
