import React from "react";
import HighchartsConfig from "./HighchartsConfig";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighCharts from "react-highcharts";
import HighchartsTheme from "./HighchartsTheme";

ReactHighCharts.Highcharts.setOptions(HighchartsTheme);

export default function PriceChart() {
	return (
		<AppContext.Consumer>
			{({ historical }) => (
				<Tile>
					{historical ? (
						<ReactHighCharts config={HighchartsConfig(historical)} />
					) : (
						<div>Loading Historical Data</div>
					)}
				</Tile>
			)}
		</AppContext.Consumer>
	);
}
