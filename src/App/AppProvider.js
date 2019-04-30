import React, { Component } from "react";
import cc from "cryptocompare";
import _ from "lodash";
import moment from "moment";

export const AppContext = React.createContext();
const MAX_FAVORITE = 10;
const TIME_UNITS = 10;

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
			setCurrentFavorite: this.setCurrentFavorite,
			setFilteredCoins: this.setFilteredCoins
		};
	}

	componentDidMount = () => {
		this.fetchCoins();
		this.fetchPrices();
		this.fetchHistorical();
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

	fetchPrices = async () => {
		if (this.state.firstVisit) return;
		let prices = await this.prices();
		this.setState({ prices });
	};

	fetchHistorical = async () => {
		if (this.state.firstVisit) return;
		let results = await this.historical();
		let historical = [
			{
				name: this.state.currentFavorite,
				data: results.map((ticker, index) => [
					moment()
						.subtract({ months: TIME_UNITS - index })
						.valueOf(),
					ticker.USD
				])
			}
		];
		console.log(historical);
		this.setState({ historical });
	};

	prices = async () => {
		let returnData = [];
		for (let i = 0; i < this.state.favorites.length; i++) {
			try {
				let priceData = await cc.priceFull(this.state.favorites[i], "USD");
				returnData.push(priceData);
			} catch (e) {
				console.error("Fetch price error", e);
			}
		}
		return returnData;
	};

	historical = () => {
		let promises = [];
		for (let units = TIME_UNITS; units > 0; units--) {
			promises.push(
				cc.priceHistorical(
					this.state.currentFavorite,
					["USD"],
					moment()
						.subtract({ months: units })
						.toDate()
				)
			);
		}
		return Promise.all(promises);
	};

	confirmFavorites = () => {
		let currentFavorite = this.state.favorites[0];
		this.setState(
			{
				firstVisit: false,
				page: "dashboard",
				currentFavorite,
				prices: null,
				historical: null
			},
			() => {
				this.fetchPrices();
				this.fetchHistorical();
			}
		);
		localStorage.setItem(
			"cryptoDash",
			JSON.stringify({
				favorites: this.state.favorites,
				currentFavorite
			})
		);
	};

	setCurrentFavorite = sym => {
		this.setState(
			{
				currentFavorite: sym,
				historical: null
			},
			this.fetchHistorical
		);
		localStorage.setItem(
			"cryptoDash",
			JSON.stringify({
				...JSON.parse(localStorage.getItem("cryptoDash")),
				currentFavorite: sym
			})
		);
	};

	savedSettings = () => {
		let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
		if (!cryptoDashData) {
			return { page: "settings", firstVisit: true };
		}
		console.log(cryptoDashData);
		let { favorites, currentFavorite } = cryptoDashData;
		return { favorites, currentFavorite };
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
