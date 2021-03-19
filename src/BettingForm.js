import React from 'react'

export default class BettingForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        amount: this.props.current_bet
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
       this.setState({amount: event.target.value});
    }

    handleSubmit(event) {
        let extraBet = this.state.amount - this.props.betSoFar
        this.props.bet(extraBet)
        event.preventDefault()
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <label>
              Raise to:
            </label>
            <input
                name="amount"
                type="number"
                min={String(this.props.current_bet)}
                value={this.state.amount}
                onChange={this.handleChange} />
            <input type="submit" value="Bet" />
        </form>
      );
    }
  }