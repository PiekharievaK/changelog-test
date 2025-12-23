import {useState} from "react";
import {handleAdd} from "./utils/utils.js";
import {TestingComponent} from "./components/testingComponent.jsx";

export const AddPage = () => {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [result, setResult] = useState(null);


    return (
        <div>
            <h2>+</h2>
            <input type="number" value={a} onChange={e => setA(e.target.value)}/>
            <input type="number" value={b} onChange={e => setB(e.target.value)}/>
            <button onClick={() => handleAdd(a, b, setResult)}>Start</button>
            {result !== null && <p>Result: {result}</p>}
            <TestingComponent/>

        </div>
    );
}
