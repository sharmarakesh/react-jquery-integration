import React from 'react';

class MyjQueryReactComponent extends React.Component {
  state = {
    context: null,
    jqueryContext: null,
    now: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      context: props.context,
      jqueryContext: props.jqueryContext,
      now: props.now,
    };
    this.onClickBtn = this.onClickBtn.bind(this);
  }

  clockTic = () => {
    setInterval(() => {
      this.setState({ now: new Date() });
    }, 1000);
  };

  componentDidMount() {
    this.clockTic();
    console.log(this.state.now);
    this.state.jqueryContext.ajax({
      url: 'https://shop-dev.enfamil.com/cart.json',
      dataType: 'jsonp',
      crossDomain: true,
      method: 'GET',
      success: function (response) {
        console.log('RESPONSE : ', response);
      },
      error: function (error) {
        console.log('ERROR : ', error);
      },
    });
  }

  onClickBtn() {
    // Getting ref to JQuery object from our parent app.
    var myDomEl = this.props.context.find('#myDomEl');

    // Update color of our element.
    myDomEl.css('background-color', 'green');
  }
  render() {
    return (
      <div className="alert alert-success" role="alert">
        <h3 id="myDomEl">Hello there!</h3>
        <Clock now={this.state.now} />
        <button
          type="button"
          className="btn btn-default"
          onClick={this.onClickBtn}
        >
          Click to Update!
        </button>
      </div>
    );
  }
}

export default MyjQueryReactComponent;

const Clock = (props) => (
  <h6
    style={{ color: 'blue' }}
  >{`Current Time: ${props.now.toLocaleTimeString()}`}</h6>
);
