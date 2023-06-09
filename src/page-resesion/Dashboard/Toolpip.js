import React from "react";
import "./Toolpip.css";

class TooltipModal extends React.Component {
  render() {
    const { text, children } = this.props;

    return (
      <div className="tooltip">
        {children}
        <span className="tooltiptext">{text}</span>
      </div>
    );
  }
}

export default TooltipModal;
