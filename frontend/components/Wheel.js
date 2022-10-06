import React from 'react'
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel(props) {
  const { wheel, moveClockwise, moveCounterClockwise } = props;

  return (
    <div id="wrapper">
      <div id="wheel">
      <div className={`cog${wheel === 0 ? " active" : ""}`} style={{ "--i": 0 }}>
          {wheel === 0 ? "B" : ""}
        </div>
        <div className={`cog${wheel === 1 ? " active" : ""}`} style={{ "--i": 1 }}>
          {wheel === 1 ? "B" : ""}
        </div>
        <div className={`cog${wheel === 2 ? " active" : ""}`} style={{ "--i": 2 }}>
          {wheel === 2 ? "B" : ""}
        </div>
        <div className={`cog${wheel === 3 ? " active" : ""}`} style={{ "--i": 3 }}>
          {wheel === 3 ? "B" : ""}
        </div>
        <div className={`cog${wheel === 4 ? " active" : ""}`} style={{ "--i": 4 }}>
          {wheel === 4 ? "B" : ""}
        </div>
        <div className={`cog${wheel === 5 ? " active" : ""}`} style={{ "--i": 5 }}>
          {wheel === 5 ? "B" : ""}
        </div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={moveCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={moveClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {wheel: state.wheel}
}

export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel);