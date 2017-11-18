/* eslint-env browser */
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
      },
    };
  }

  updateNewSanta = e => this.setState({
    newSanta: { ...this.state.newSanta, [e.target.name]: e.target.value },
  });

  updateExistingSanta = santa => e => this.setState({
    santas: {
      ...this.state.santas,
      [santa]: {
        ...this.state.santas[santa],
        [e.target.name]: e.target.value,
      },
    },
  });

  addSanta = () => {
    if (!this.state.newSanta.name || !this.state.newSanta.phone) { return; }
    this.setState({
      santas: {
        ...this.state.santas,
        [this.state.newSanta.name]: {
          phone: this.state.newSanta.phone,
          notFor: this.state.newSanta.notFor,
        },
      },
      newSanta: { name: '', phone: '', notFor: [] },
    });
  }

  deleteSanta = santa => (e) => {
    e.preventDefault();
    const newSantas = { ...this.state.santas };
    delete newSantas[santa];
    this.setState({ santas: newSantas });
  }

  submit = (e) => {
    e.preventDefault();
    this.setState({
      status: {
        pending: true,
        error: false,
        result: {},
      },
    });
    fetch('/process', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.santas),
    })
      .then(response => response.json())
      .then((result) => {
        this.setState({
          status: {
            pending: false,
            error: !!result.error,
            result,
          },
        });
      });
  }

  render() {
    const { santas, status } = this.state;
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Can&apos;t buy for</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {Object.keys(santas).map(santa => (
              <tr key={santa}>
                <td>{santa}</td>
                <td>{santas[santa].phone}</td>
                <td>
                  <Multiselect
                    name="notFor"
                    data={Object.keys(santas).filter(v => v !== santa)}
                    onChange={this.updateExistingSanta}
                    value={santas[santa].notFor}
                  />
                </td>
                <td>
                  <input type="button" value="Delete" onClick={this.deleteSanta(santa)} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="John Doe"
                  name="name"
                  onChange={this.updateNewSanta}
                  value={this.state.newSanta.name}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="403-123-1234"
                  name="phone"
                  onChange={this.updateNewSanta}
                  value={this.state.newSanta.phone}
                />
              </td>
              <td>
                <Multiselect
                  name="notFor"
                  data={Object.keys(this.state.santas)}
                  onChange={this.updateNewSanta}
                  value={this.state.newSanta.notFor}
                />
              </td>
              <td>
                <input
                  type="button"
                  onClick={this.addSanta}
                  value="Add Santa"
                  disabled={!this.state.newSanta}
                />
              </td>
            </tr>
          </tfoot>
        </table>

        <h1>Compile the Nice List</h1>
        {status.error
          ? <p>{status.result.error}</p>
          : (<ul>{Object.keys(status.result)
              .map(santa => <li key={santa}>{santa} buys for {status.result[santa]}</li>)
            }</ul>)
        }
        <input
          type="button"
          value="Start shopping"
          onClick={this.submit}
          disabled={status.pending}
        />
      </div>
    );
  }
}
