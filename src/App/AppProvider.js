import React, { Component } from "react";
import cc from "cryptocompare";
import _ from "lodash";

export const AppContext = React.createContext();
const MAX_FAVORITE = 10;

export class AppProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "dashboard",
			favorites: ["BTC", "ETC", "XMR", "DOGE"],
			...this.savedSettings(),
			setPage: this.setPage,
			addCoin: this.addCoin,
			removeCoin: this.removeCoin,
			isInFavorites: this.isInFavorites,
			confirmFavorites: this.confirmFavorites,
			setFilteredCoins: this.setFilteredCoins
		};
	}

	componentDidMount = () => {
		this.fetchCoins();
	};

	addCoin = key => {
		let favorites = [...this.state.favorites];
		if (favorites.length < MAX_FAVORITE) {
			favorites.push(key);
			this.setState({ favorites });
		}
	};

	removeCoin = key => {
		let favorites = [...this.state.favorites];
		this.setState({ favorites: _.pull(favorites, key) });
	};

	isInFavorites = key => _.includes(this.state.favorites, key);

	fetchCoins = async () => {
		let coinList = (await cc.coinList()).Data;
		this.setState({ coinList });
	};

	confirmFavorites = () => {
		this.setState({
			firstVisit: false,
			page: "dashboard"
		});
		localStorage.setItem(
			"cryptoDash",
			JSON.stringify({
				favorites: this.state.favorites
			})
		);
	};

	savedSettings = () => {
		let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
		if (!cryptoDashData) {
			return { page: "settings", firstVisit: true };
		}
		console.log(cryptoDashData);
		let { favorites } = cryptoDashData;
		return { favorites };
	};

	setPage = page => {
		this.setState({ page });
	};

	setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

	render() {
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
