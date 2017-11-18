import React from 'react';

export default class SantaList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      santas: {},
      newSanta: { name: '', phone: '' },
    };
  }

  updateNewSanta = (e) => this.setState({
    newSanta: { ...this.state.newSanta, [e.target.name]: e.target.value },
  });

  addSanta = () => {
    if (!this.state.newSanta.name || !this.state.newSanta.phone) { return; }
    this.setState({
      santas: {
        ...this.state.santas,
        [this.state.newSanta.name]: { phone: [this.state.newSanta.phone] },
      },
      newSanta: { name: '', phone: '' },
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
    fetch('/process', {
      method: 'POST',
      body: this.state.santas,
    }).then((response) => {
      console.log('Response', response);
    })
  }

  render() {
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
      <input type="button" value="Start shopping" onClick={this.submit} />
    </div>);
  }
};
