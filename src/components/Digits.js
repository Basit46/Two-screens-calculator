import React from "react";
import { ACTION } from "../App";

const Digits = ({ digit, dispatch }) => {
  return (
    <div
      onClick={() => dispatch({ type: ACTION.ADD_DIGITS, payload: { digit } })}
      className="button"
    >
      {digit}
    </div>
  );
};

export default Digits;
