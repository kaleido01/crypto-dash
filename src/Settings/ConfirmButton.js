import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";

const ConfirmButtonStyled = styled.div`
	margin: 20px;
	color: green;
`;

export const CenterDiv = styled.div`
	display: grid;
	justify-content: center;
`;

export default function ConfirmButton() {
	return (
		<AppContext.Consumer>
			{({ confirmFavorites }) => (
				<CenterDiv>
					<ConfirmButtonStyled onClick={confirmFavorites}>
						Confirm Favorite
					</ConfirmButtonStyled>
				</CenterDiv>
			)}
		</AppContext.Consumer>
	);
}
