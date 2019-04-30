import React from "react";
import HighchartsConfig from "./HighchartsConfig";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighCharts from "react-highcharts";

export default function PriceChart() {
	return (
		<AppContext.Consumer>
			{({}) => (
				<Tile>
					<ReactHighCharts config={HighchartsConfig()} />
				</Tile>
			)}
		</AppContext.Consumer>
	);
}
