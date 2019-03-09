
  
import React, { Component } from "react";
import AddPeople from "./AddPeople";
import "./App.css";


const firebaseURL = 'https://project2-b052b.firebaseio.com/'

class App extends Component {
  state = {
    people: []
  };
  

  handleToggleFav = (personId, isFavorite) => {
    const shouldBeFavorite = !isFavorite;
    fetch(`${firebaseURL}/people/${personId}.json`, {
      method: 'PATCH',
      body: JSON.stringify({
        isFavorite: shouldBeFavorite,
      }),
    }).then(this.syncContacts);
  };

  addName = (name, surname, phone, isFavorite) => {
    fetch(`${firebaseURL}/people.json`, {
      method: 'POST',
      body: JSON.stringify({
        name, surname, phone, isFavorite
      })
    }).then(this.syncContacts)
  };


  handleRemove = personId => {
    fetch(`${firebaseURL}/people/${personId}.json`, {
      method: 'DELETE',
    }).then(this.syncContacts);
  };

  syncContacts = () =>
    fetch(`${firebaseURL}/people.json`)
      .then(response => response.json())
      .then(data =>
        Object.entries(data || {}).map(([id, value]) => ({
          id,
          ...value,
        }))
      )
      .then(people => this.setState({people }));

  componentDidMount() {
    this.syncContacts();
  }

  render() {
    return (
      <div className="App">
        <AddPeople addName={this.addName} />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Phone</th>
              <th />
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
                  <td>
                    <button onClick={() => this.handleToggleFav(person.id)}>
                      Toggle favorite
                    </button>
                  </td>
                  <td>
                    <button onClick={(() => this.handleRemove(person.id))}>Remove contact</button>
                  </td>
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