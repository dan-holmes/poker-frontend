import axios from 'axios';
import React from 'react'

export default class BettingForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        amount: 0
      };
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
       this.setState({amount: event.target.value});
    }

    handleSubmit(event) {
        let data = new FormData();
        data.append('amount', this.state.amount);
        axios({
            method: "post",
            url: process.env.REACT_APP_BACKEND_URL + "/bets",
            data: data,
            headers: { 
              "Content-Type": "multipart/form-data",
              'Authorization': `token ${this.props.token}`
            },
          })
            .catch(function (response) {
              console.log(response);
            });
        event.preventDefault()
    }
  
    render() {
      if (this.props.round.data.winner) {
        return null
      }
      if (this.props.round.data.player_to_bet !== this.props.name) {
        return null
      }
      return (
        <form onSubmit={this.handleSubmit}>
            <input
                name="amount"
                type="number"
                value={this.state.amount}
                onChange={this.handleChange} />
            <input type="submit" value="Submit" />
        </form>
      );
    }
  }