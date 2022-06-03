import React from "react";

export class ChkBoxSigText extends React.Component {
	constructor(props) {
		super(props);
		this.state = {checked: false}
	}
	handleChange = () => {
		this.setState({
      checked: !this.state.checked
    })
	}
	
	render()
	{
		return(
		<div>
			<input type="checkbox" id="chkShowSigText" 
				checked={this.props.checked} 
				onChange={(event) => this.handleChange(event)} 
				/>Output SigText to browser text window
		</div>
		);
	}
}
