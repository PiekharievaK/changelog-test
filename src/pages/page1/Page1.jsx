import {useState} from "react";
import {handleAdd} from "./utils/utils.js";
import {TestingComponent} from "./components/testingComponent.jsx";
import {TestingComponent2} from "./components/testComponent2.jsx";

export const AddPage = () => {

    return (
        <div>
            <h2>+</h2>
            <input type="number" value={a} onChange={e => setA(e.target.value)}/>
            <input type="number" value={b} onChange={e => setB(e.target.value)}/>
            <button onClick={() => handleAdd(a, b, setResult)}>Start</button>
            {result !== null && <p>Result: {result}</p>}
            <TestingComponent2/>
        </div>
    );
};
