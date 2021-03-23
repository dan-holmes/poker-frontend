import React from 'react'
const axios = require('axios');

export default class JoinGameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: ""
      };
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setToken = this.props.setToken.bind(this);
        this.setName = this.props.setName.bind(this);
        this.getData = this.props.getData.bind(this);
    }
  
    handleChange(event) {
       this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        let data = new FormData();
        data.append('name', this.state.name);
        axios({
            method: "post",
            url: this.props.backend_url + "/players",
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
            this.setToken(response.data.token)
            this.setName(this.state.name)
            this.getData()
        })
        .catch((error) => {
            console.log(error)
        })
        event.preventDefault()
    }
  
    render() {
      return (
        <div id='joinGamePage'>
          <div id='joinGameHeader'>Poker</div>
          <form onSubmit={this.handleSubmit} id='joinGameForm'>
              <label>
              Name: <input
                  name="name"
                  type="text"
                  value={this.state.value}
                  id='joinGameInput'
                  onChange={this.handleChange} />
              </label> <input id='joinGameButton' type="submit" value="Join Game" />
              
          </form>
        </div>
      );
    }
  }