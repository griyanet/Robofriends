import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchField: '',
		};

		// console.log('print 1. Constructor');
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((users) => this.setState({ robots: users }));

		// console.log('print 2. ComponentDidMount hook');
	}

	onSearchChange = (event) => {
		this.setState({ searchField: event.target.value });
	};

	render() {
		const { robots, searchField } = this.state;
		const filteredRobots = robots.filter((robot) => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		});

		// console.log('print 3. Render hook');

		return !robots.length ? (
			<h1 className="tc">Loading...</h1>
		) : (
			<div className="tc">
				<h1 className="h1">RobotFriends</h1>
				<SearchBox searchChange={this.onSearchChange} />
				<Scroll>
					<CardList robots={filteredRobots} />
				</Scroll>
			</div>
		);
	}
}

export default App;
