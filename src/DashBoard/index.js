import React from "react";
import styled, { css } from "styled-components";
import Page from "../Shared/Page";
import PriceGrid from "./PriceGrid";
import CoinSpotlight from "./CoinSpotlight";

const ChartGrid = styled.div`
	display: grid;
	margin-top: 20px;
	grid-gap: 15px;
	grid-template-columns: 1fr 3fr;
`;

export default function index() {
	return (
		<Page name="dashboard">
			<PriceGrid />
			<ChartGrid>
				<CoinSpotlight />
				<div>TODO:chart</div>
			</ChartGrid>
		</Page>
	);
}
