import React from 'react';

import Multiselect from '../Multiselect/';

export default class SantaList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      santas: {
        Mom: {
          phone: '1',
          notFor: ['Dad'],
        },
        Dad: {
          phone: '1',
          notFor: ['Mom'],
        },
        Kelsey: {
          phone: '1',
          notFor: ['Chance'],
        },
        Chance: {
          phone: '1',
          notFor: ['Kelsey'],
        },
        Spenser: {
          phone: '1',
          notFor: ['Samantha'],
        },
        Samantha: {
          phone: '1',
          notFor: ['Spenser'],
        },
      },
      newSanta: { name: '', phone: '', notFor: [] },
      status: {
        pending: false,
        error: false,
        result: {},
      }
    };
  }

  updateNewSanta = (event, metadata) => {
    // Handle non-standard events from react-widgets
    const e = metadata && metadata.originalEvent || event;
    console.log(event, e);
    this.setState({
      newSanta: { ...this.state.newSanta, [e.target.name]: e.target.value },
    });
  };

  addSanta = () => {
    if (!this.state.newSanta.name || !this.state.newSanta.phone) { return; }
    this.setState({
      santas: {
        ...this.state.santas,
        [this.state.newSanta.name]: { phone: this.state.newSanta.phone },
      },
      newSanta: { name: '', phone: '', notFor: [] },
    })
  }

  deleteSanta = santa => e => {
    e.preventDefault();
    const newSantas = { ...this.state.santas };
    delete newSantas[santa];
    this.setState({ santas: newSantas });
  }

  submit = e => {
    e.preventDefault();
    this.setState({ status: {
      pending: true,
      error: false,
      result: {},
    }});
    fetch('/process', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.santas),
    })
    .then(response => response.json())
    .then(result => {
      this.setState({ status: {
        pending: false,
        error: !!result.error,
        result,
      }})
    })
  }

  render() {
    const { status } = this.state;
    return (<div>
      <h1>Add your Santas</h1>
      <div>
        <input
          type="text"
          placeholder="John Doe"
          name="name"
          onChange={this.updateNewSanta}
          value={this.state.newSanta.name}
        />
        <input
          type="text"
          placeholder="403-123-1234"
          name="phone"
          onChange={this.updateNewSanta}
          value={this.state.newSanta.phone}
        />
        <Multiselect
          name="notFor"
          data={Object.keys(this.state.santas)}
          onChange={this.updateNewSanta}
          value={this.state.newSanta.notFor}
        />
        <input
          type="button"
          onClick={this.addSanta}
          value="Add Santa"
          disabled={!this.state.newSanta}
        />
      </div>
      {Object.keys(this.state.santas).map(santa => (
        <li key={santa}>
          <h2>Hello {santa}</h2>
          <input type="button" value="Delete" onClick={this.deleteSanta(santa)} />
        </li>
      ))}
      <h1>Compile the Nice List</h1>
      {status.error
        ? <p>{status.result.error}</p>
        : <ul>{Object.keys(status.result).map(santa => <li>{santa} buys for {status.result[santa]}</li>)}</ul>}
      <input type="button" value="Start shopping" onClick={this.submit} />
    </div>);
  }
};
