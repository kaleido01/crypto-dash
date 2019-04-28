import React from "react";
import styled, { css } from "styled-components";
import { AppContext } from "./../App/AppProvider";
import { SelectableTile } from "../Shared/Tile";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 15px;
	margin-top: 40px;
`;

const getCoinsToDisplay = (coinList, topSection) => {
	return Object.keys(coinList).slice(0, topSection ? 10 : 100);
};

export default function CoinGrid({ topSection }) {
	return (
		<AppContext.Consumer>
			{({ coinList }) => (
				<CoinGridStyled>
					{getCoinsToDisplay(coinList, topSection).map(coinKey => (
						<CoinTile coinKey={coinKey} topSection={topSection} />
					))}
				</CoinGridStyled>
			)}
		</AppContext.Consumer>
	);
}
