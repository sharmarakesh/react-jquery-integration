import React from 'react';

class MyjQueryReactComponentWithUIHelper extends React.Component {
  stahe = {
    context: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      context: props.context,
    };
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  onBtnClick() {
    this.state.context.getBgColor(this, function (color, self) {
      self.state.context.setBgColor('red');
    });
    this.state.context.getTextColor(this, function (color, self) {
      self.state.context.setTextColor('white');
    });
  }
  render() {
    return (
      <div className="alert alert-success" role="alert">
        <h3 id="elm">Hi there!</h3>
        <button
          type="button"
          className="btn btn-default"
          onClick={this.onBtnClick}
        >
          Click to Update!
        </button>
      </div>
    );
  }
}

export default MyjQueryReactComponentWithUIHelper;
