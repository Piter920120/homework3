
  
import React, { Component } from "react";
import AddPeople from './AddPeople'
import "./App.css";

class App extends Component {
  state = {
    people: []
  };
  componentDidMount() {
    fetch(process.env.PUBLIC_URL + "data/people.json")
      .then(response => response.json())
      .then(people => this.setState({ people }))
      .catch(err => console.log(err));
  }
   

 handleToggleFav = personId => {
   this.setState({
     people: this.state.people.map(person => {
      return (
        personId === person.id ?
       {
         ...person,
         isFavorite: !(person.isFavorite)
       }
         : person
     )
       })
     })
 }

addName = (name, surname, phone) => {
  if (name && surname && phone) {
    this.setState({
     people: this.state.people.concat({
       id: Date.now(),
       name: name,
       surname: surname,
       phone: phone,
       isFavorite: false
     })
    })
   }
 }
 

  render() {
    return (
      <div className="App">
        <AddPeople addName={this.addName}/>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.people.map(person => {
              return (
                <tr
                  className={person.isFavorite ? "highlighted" : ""}
                  key={person.id}
                >
                  <td>{person.name}</td>
                  <td>{person.surname}</td>
                  <td>{person.phone}</td>
                  <td><button onClick={() => this.handleToggleFav(person.id)}>Toggle favorite</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;