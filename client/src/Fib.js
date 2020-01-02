import React, { Component } from 'react';
import axios from 'axios';

export default class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    async componentDidMount() {
        await this.fetchValues();
        await this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ ...this.state, values: values.data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({
            ...this.state,
            seenIndexes: seenIndexes.data
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        await axios.post('/api/values', {
            index: this.state.index
        });
    };

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        const entries = [];
        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    {key} I calculated {this.state.values[key]}
                </div>
            );
        }
        return entries;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter Index:</label>
                    <input
                        value={this.state.index}
                        onChange={event =>
                            this.setState({
                                ...this.state,
                                index: event.target.value
                            })
                        }
                    ></input>
                    <button>Submit</button>
                </form>

                <h3>Indexes I have seen</h3>
                {this.renderSeenIndexes()}

                <h3>Calculated Values</h3>
                {this.renderValues()}
            </div>
        );
    }
}
