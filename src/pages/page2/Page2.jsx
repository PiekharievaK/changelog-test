import { useState } from "react";
import {TEXT} from "./constants/page2.constants.js";

export default function SubtractPage() {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [result, setResult] = useState(null);

    const handleSubtract = () => setResult(Number(a) + Number(b));

    return (
        <div>
            <h2>+</h2>
            <input type="number" value={a} onChange={e => setA(e.target.value)} />
            <input type="number" value={b} onChange={e => setB(e.target.value)} />
            <button onClick={handleSubtract}>Start</button>
            {result !== null && <p>Result: {result}</p>}

            <p>{TEXT}</p>

        </div>
    );
}
