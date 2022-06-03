import React from "react";

export class LastName extends React.Component {
	constructor(props) {
		super(props);
    this.state = {lastName: "Smith"};
  }
	handleOnChange(event) {
    this.setState({
      lastName: event.target.value
    })
  }
  render()
  {
    return (
			<div>
				Last name: <input type="text" id="lname" onChange={(event) => this.handleOnChange(event)} defaultValue={this.state.lastName}/>
			</div>
    );
  }
}
