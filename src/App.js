import React, { useReducer } from "react";
import "./App.css";
import Digits from "./components/Digits";
import Operations from "./components/Operations";

export const ACTION = {
  ADD_DIGITS: "add-digits",
  ADD_OPERATION: "add_operation",
  CLEAR: "clear",
  EVAL: "eval",
  DEL: "delete",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.ADD_DIGITS:
      if (action.payload.digit === 0 && state.current === "0") {
        return state;
      }
      if (action.payload.digit === "." && state.current.includes(".")) {
        return state;
      }
      return {
        ...state,
        current: `${state.current || ""}${action.payload.digit}`,
      };

    case ACTION.ADD_OPERATION:
      if (state.previous != null && state.current != null) {
        return {
          ...state,
          previous: evaluate(
            state.current,
            state.previous,
            action.payload.operation
          ),
          current: null,
        };
      }
      if (state.current == null) {
        return {
          ...state,
          operation: action.payload.operation,
        };
      }
      return {
        ...state,
        previous: state.current,
        current: null,
        operation: `${action.payload.operation}`,
      };
    case ACTION.CLEAR:
      return {};
    case ACTION.EVAL:
      return {
        ...state,
        previous: evaluate(state.current, state.previous, state.operation),
        current: null,
        operation: null,
      };
    case ACTION.DEL:
      return {
        ...state,
        current: state.current.slice(0, -1),
      };
    default:
      return state;
  }
};

function evaluate(curr, prev, ope) {
  switch (ope) {
    case "+":
      let add = parseFloat(prev) + parseFloat(curr);
      return add;
    case "-":
      console.log(curr, prev);
      let minus = parseFloat(prev) - parseFloat(curr);
      return minus;
    case "*":
      let multiply = parseFloat(prev) * parseFloat(curr);
      return multiply;
    case "/":
      let divide = parseFloat(prev) / parseFloat(curr);
      return divide;
    default:
      return;
  }
}
function App() {
  const [{ current, previous, operation }, dispatch] = useReducer(reducer, {});
  return (
    <div className="relative bg-white w-screen h-screen flex justify-center items-center ">
      <h1 className="absolute top-0 left-0 ml-4 font-bold text-3xl">
        BASIT'S CALCULATOR
      </h1>
      <div className="shadowAdd calc w-fit grid grid-cols-4 bg-white text-black gap-1">
        <div className="output col-span-4 h-24 min-h-min w-64 text-white">
          <div className="prev bg-blue-600 w-full h-12 flex justify-end items-end font-bold text-3xl">
            {previous}
            {operation}
          </div>
          <div className="current bg-red-600 w-full h-12 flex justify-end items-end text-4xl font-bold">
            {current}
          </div>
        </div>
        <div
          onClick={() => dispatch({ type: ACTION.CLEAR })}
          className="button col-span-2 bg-black text-white"
        >
          AC
        </div>
        <div
          onClick={() => dispatch({ type: ACTION.DEL })}
          className="button bg-black text-white"
        >
          DEL
        </div>
        <Operations dispatch={dispatch} operation={"+"} />
        <Digits dispatch={dispatch} digit={1} />
        <Digits dispatch={dispatch} digit={2} />
        <Digits dispatch={dispatch} digit={3} />
        <Operations dispatch={dispatch} operation={"-"} />
        <Digits dispatch={dispatch} digit={4} />
        <Digits dispatch={dispatch} digit={5} />
        <Digits dispatch={dispatch} digit={6} />
        <Operations dispatch={dispatch} operation={"*"} />
        <Digits dispatch={dispatch} digit={7} />
        <Digits dispatch={dispatch} digit={8} />
        <Digits dispatch={dispatch} digit={9} />
        <Operations dispatch={dispatch} operation={"/"} />
        <Digits dispatch={dispatch} digit={"."} />
        <Digits dispatch={dispatch} digit={0} />
        <div
          onClick={() => dispatch({ type: ACTION.EVAL })}
          className="button col-span-2 bg-black text-white"
        >
          =
        </div>
      </div>
    </div>
  );
}

export default App;
