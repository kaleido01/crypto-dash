import React, { Component } from "react";
import "./App.css";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
import Settings from "../Settings";
import { AppProvider } from "./AppProvider";

class App extends Component {
	render() {
		return (
			<AppLayout>
				<AppProvider>
					<AppBar />
					<Settings />
				</AppProvider>
			</AppLayout>
		);
	}
}
export default App;
