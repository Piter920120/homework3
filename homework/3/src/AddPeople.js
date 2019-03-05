import React, { Component } from "react";

class AddPeople extends Component {
  state = {
    name: "",
    surname: "",
    phone: ""
  };

  changeName = e => {
      const inputValue = e.target.value
    this.setState({
      name: inputValue
    });
  };

  handleSubmitName = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.addName(this.state.name, this.state.surname, this.state.phone);
  };

    changeSurname = e => {
      const inputValue = e.target.value
      this.setState({
          surname: inputValue
        });
    }

    changePhone = e => {
        const inputValue = e.target.value
        this.setState({
          phone: inputValue
        });
    }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitName}>
          <label>Name</label>
          <input type="text" onChange={this.changeName} />
        </form>
        <form onSubmit={this.handleSubmitName}>
          <label>Surname</label>
          <input type="text" onChange={this.changeSurname} />
        </form>
        <form onSubmit={this.handleSubmitName}>
          <label>Phone</label>
          <input type="phone" onChange={this.changePhone} />
        </form>
      </div>
    );
  }
}

export default AddPeople;