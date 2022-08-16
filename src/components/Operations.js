import React from "react";
import { ACTION } from "../App";
const Operations = ({ operation, dispatch }) => {
  return (
    <div
      onClick={() =>
        dispatch({ type: ACTION.ADD_OPERATION, payload: { operation } })
      }
      className="button bg-black text-white"
    >
      {operation}
    </div>
  );
};

export default Operations;
