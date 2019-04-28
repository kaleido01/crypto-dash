import React from "react";
import { AppContext } from "./../App/AppProvider";
import { SelectableTile, DeletableTile, DisabledTile } from "../Shared/Tile";
import CoinHeaderGrid from "./CoinHeaderGrid";
import CoinImage from "./CoinImage";

const clickCoinHandler = (topSection, coinKey, addCoin, removeCoin) => {
	return topSection
		? () => {
				removeCoin(coinKey);
		  }
		: () => {
				addCoin(coinKey);
		  };
};

export default function CoinTile({ coinKey, topSection }) {
	return (
		<AppContext.Consumer>
			{({ coinList, addCoin, removeCoin, isInFavorites }) => {
				let coin = coinList[coinKey];

				const TileClass = topSection
					? DeletableTile
					: isInFavorites(coinKey)
					? DisabledTile
					: SelectableTile;

				// const TileClass = SelectableTile;
				// if(topSection)={
				//   TileClass=DeletableTile
				// }
				return (
					<TileClass
						onClick={clickCoinHandler(
							topSection,
							coinKey,
							addCoin,
							removeCoin
						)}>
						<CoinHeaderGrid
							topSection={topSection}
							name={coin.CoinName}
							symbol={coin.Symbol}
						/>
						<CoinImage coin={coin} />
					</TileClass>
				);
			}}
		</AppContext.Consumer>
	);
}
