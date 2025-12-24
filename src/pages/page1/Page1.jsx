import { useState } from "react";
import {handleMath} from "../../utils/utils.js";

export const AddPage = () =>  {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [c, setC] = useState(0);
    const [d, setD] = useState(0);
    const [e, setE] = useState(0);
    const [f, setF] = useState(0);
    const [result1, setResult1] = useState(null);
    const [result2, setResult2] = useState(null);
    const [result3, setResult3] = useState(null);

    const action1 = '+'
    const action2 = '-'
    const action3 = '*'
    return (
        <div>
            <div>
                <h2>{action1}</h2>
                <input type="number" value={a} onChange={e => setA(e.target.value)} />
                <input type="number" value={b} onChange={e => setB(e.target.value)} />
                <button onClick={() => handleMath(a, b, action1 , setResult1)}>Start</button>
                {result1 !== null && <p>Result: {result1}</p>}
            </div>
            <div>
                <h2>{action2}</h2>
                <input type="number" value={c} onChange={e => setC(e.target.value)} />
                <input type="number" value={d} onChange={e => setD(e.target.value)} />
                <button onClick={() => handleMath(c, d, action2 , setResult2)}>Start</button>
                {result2 !== null && <p>Result: {result2}</p>}
            </div>
            <div>
                <h2>{action3}</h2>
                <input type="number" value={e} onChange={e => setE(e.target.value)} />
                <input type="number" value={f} onChange={e => setF(e.target.value)} />
                <button onClick={() => handleMath(e, f, action3 , setResult3)}>Start</button>
                {result3 !== null && <p>Result: {result3}</p>}
            </div>
        </div>
    );
}