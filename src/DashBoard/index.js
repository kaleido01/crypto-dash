import React from "react";
import styled from "styled-components";
import Page from "../Shared/Page";
import PriceGrid from "./PriceGrid";
import CoinSpotlight from "./CoinSpotlight";
import PriceChart from "./PriceChart";

const ChartGrid = styled.div`
	display: grid;
	margin-top: 20px;
	grid-gap: 15px;
	grid-template-columns: 1fr 0 3fr;

	@media (max-width: 767px) {
		display: block;
		width: 100%;
		height: auto;
		text-align: center;
	}
`;

const MobileMargin = styled.div`
	@media (max-width: 767px) {
		display: block;
		margin: 20px;
	}
`;

export default function index() {
	return (
		<Page name="dashboard">
			<PriceGrid />
			<ChartGrid>
				<CoinSpotlight />
				<MobileMargin>
					<div />
				</MobileMargin>
				<PriceChart />
			</ChartGrid>
		</Page>
	);
}
