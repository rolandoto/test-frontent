import React from "react";

const boxStyle = {
	height: "70mm",
	width: "120mm",
	border: "1px solid #d3d3d3",
}

export class ImageBox extends React.Component {
	
	constructor(props) {
		super(props);
    this.state = {
			imageSrc: "",
			height:270,
			width:460
		};
  }
  
	handleOnChange(event) {
    this.setState({
			imageSrc: event.target.value
    })
		console.log("imageSrc changed");      
  }
	render()
	{
		return(
			<div>
				<img id="imageBox" className="boxed" src={this.state.imageSrc} style={boxStyle} onChange={(event) => this.handleOnChange(event)}/>
			</div>
		);
	}
}
