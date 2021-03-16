import axios from 'axios';
import React from 'react'

export default class BettingForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: props.current_bet
      };
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.refresh = this.props.refresh.bind(this);
    }
  
    handleChange(event) {
       this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        let data = new FormData();
        data.append('player_name', this.props.player_to_bet);
        data.append('amount', this.state.value);
        axios({
            method: "post",
            url: "http://localhost:9292/bets",
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(() => {
                this.props.refresh()
            })
            .catch(function (response) {
              console.log(response);
            });
        event.preventDefault()
    }
  
    render() {
      if (this.props.winner) {
        return null
      }
      return (
        <form onSubmit={this.handleSubmit}>
            <input
                name="amount"
                type="number"
                value={this.state.value}
                onChange={this.handleChange} />
            <input type="submit" value="Submit" />
        </form>
      );
    }
  }