import React from "react";
import styled from "styled-components";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import CoinImage from "../Shared/CoinImage";

const SpotLight = styled.div`
	text-align: center;
`;

export default function() {
	return (
		<AppContext.Consumer>
			{({ currentFavorite, coinList }) => (
				<Tile>
					<SpotLight>
						<h2>{coinList[currentFavorite].CoinName}</h2>
					</SpotLight>
					<CoinImage coin={coinList[currentFavorite]} spotlight />
				</Tile>
			)}
		</AppContext.Consumer>
	);
}
