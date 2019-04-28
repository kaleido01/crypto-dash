import React from "react";
import { AppContext } from "./../App/AppProvider";
import { SelectableTile, DeletableTile, DisabledTile } from "../Shared/Tile";
import CoinHeaderGrid from "./CoinHeaderGrid";
import CoinImage from "./CoinImage";

export default function CoinTile({ coinKey, topSection }) {
	return (
		<AppContext.Consumer>
			{({ coinList }) => {
				let coin = coinList[coinKey];

				const TileClass = topSection ? DeletableTile : SelectableTile;

				// const TileClass = SelectableTile;
				// if(topSection)={
				//   TileClass=DeletableTile
				// }
				return (
					<TileClass>
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
