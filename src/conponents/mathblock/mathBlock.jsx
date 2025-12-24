import { useState } from "react";
import { handleMath } from "../../utils/utils.js";

export const MathBlock = ({ action }) => {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [result, setResult] = useState(null);

    return (
        <div>
            <h3>{action}</h3>

            <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
            />

            <input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
            />

            <button onClick={() => handleMath(a, b, action, setResult)}>
                Start
            </button>

            {result !== null && <p>Result: {result}</p>}
        </div>
    );
};
