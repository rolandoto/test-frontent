import React from "react";

export class FirstName extends React.Component {
	constructor(props) {
		super(props);
    this.state = {firstName: "John"};
	console.log(props)
  }
	handleOnChange(event) {
    this.setState({
      firstName: event.target.value
    })
  }
  render()
  {
    return (
			<div>
				First name: <input type="text" id="fname" onChange={(event) => this.handleOnChange(event)} defaultValue={this.state.firstName}/>
			</div>
    );
  }
}
