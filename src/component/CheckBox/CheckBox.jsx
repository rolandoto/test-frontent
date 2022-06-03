import React from "react"

export class ChkBoxDisplayWizard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {checked: true}
	}
	handleOnChange(event) {
		this.setState({
			checked: event.target.value
		})
	}
	render()
	{
		return(
		<div>
			<input type="checkbox" id="chkDisplayWizard" defaultChecked="true" onChange={(event) => this.handleOnChange(event)}/>Display wizard control window 
		</div>
		);
	}
}
