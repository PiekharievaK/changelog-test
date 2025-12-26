import {handleAdd} from "./utils/utils.js";
import {TestingComponent} from "./components/testingComponent.jsx";
import {TestingComponent2} from "./components/testComponent2.jsx";
import {useState} from "react";
import {Link, Outlet} from "react-router-dom";

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
            <>
                <Link to={'1'}>subpage1</Link>
                <Link to={'2'}>subpage2</Link>
                <Link to={'3'}>subpage4</Link>
            </>
            <TestingComponent2/>

            <Outlet/>
        </div>
    );
};
