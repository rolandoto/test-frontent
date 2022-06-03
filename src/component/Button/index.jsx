import React from "react"


const btnStyle = {
	height: "15mm",
  width: "35mm",
  fontSize: "20px",
}

export class ButtonStartStopWizard extends React.Component {
	constructor(props) {
		super(props);
    this.state = {disabled: false, value:"Start Wizard"};
  }
	handleOnChange(event) {
		if (this.props.id === "Restore")
		{
			// Disable the Restore button when required
			this.setState({
				disabled: event.target.value
			})
		}
  }
  render()
  {
    return (
			<div>
				<input type="button" id={this.props.id} value={this.props.value} disabled={this.state.disabled} style={btnStyle} 
					onChange={(event) => this.handleOnChange(event)}  
					onClick={this.props.funcName} />
			</div>
    );
  }
}