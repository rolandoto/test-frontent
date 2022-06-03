import React from "react";

export class RadioButtonType extends React.Component
{
	constructor(props) {
		super(props);
		this.state = {checked: true, optionSelected: 'standard'}
	}
	
	getInitialState()
	{
		return 
		{
			
		};
	}
	
	handleOptionChange(changeEvent) {
		this.setState({
			optionSelected: changeEvent.target.value
		});
		this.setState({
			checked: !this.state.checked
		});
	}
	
	render()
	{
		return (
			<div>
				<div>
					<input type="radio" name="buttontype" id="radio_standard" value="standard"
						labeltext="Use standard buttons" checked={this.state.optionSelected === "standard"}
						onChange={(event) => this.handleOptionChange(event)}/>
					<label htmlFor="standard" >Standard</label>
				</div>
				<div>
					<input type="radio" name="buttontype" id="radio_utf8" value="utf8"
						labeltext="Display UTF-8 text (e.g. for languages using logograms)" checked={this.state.optionSelected === "utf8"}
						onChange={(event) => this.handleOptionChange(event)}/>
					<label htmlFor="UTF8" >Display UTF-8 text (e.g. for languages using logograms)</label>
				</div>
				<div>
					<input type="radio" name="buttontype" id="radio_remote" value="remote" checked={this.state.optionSelected === "remote"}
						labeltext="Use remote (URL) images"
						onChange={(event) => this.handleOptionChange(event)}/>
					<label htmlFor="remote" >Use remote (URL) images</label>
				</div>
			</div>
		);
	}
}
	