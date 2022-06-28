import React, { Component } from "react";
import { variables } from "../Variables";
import axios from "axios"

const userAPI = (url = variables.API_URL + 'User/') => {
    return {
        getUsers: () => axios.get(url)
    }
}

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      userList: []
    };
  }

  componentDidMount() {
    userAPI().getUsers().then(res => {
        this.setState({
            userList: res.data
        })
    })
  }

  render() {
    return (
      <div className="container">
        <table className="table">
            <thead className="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Password</th>
                <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                {this.state.userList.map((user, index) => {
                    return (<tr>
                        <th scope="row">{index}</th>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td>{user.email}</td>
                    </tr>)  
                })}
            </tbody>
            </table>
      </div>
    );
  }
}