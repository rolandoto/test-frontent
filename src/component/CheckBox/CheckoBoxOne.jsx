import React from  "react"

export class ChkBoxLargeCheckBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {checked: false}
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
			<input type="checkbox" id="chkLargeCheckbox" onChange={(event) => this.handleOnChange(event)}/>Use enlarged checkbox 
		</div>
		);
	}
}