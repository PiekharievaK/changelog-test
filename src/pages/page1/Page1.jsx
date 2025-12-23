import {useState} from "react";

export const AddPage = () => {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [result, setResult] = useState(null);

    const handleAdd = () => setResult(Number(a) + Number(b));

    return (
        <div>
            <h2>+</h2>
            <input type="number" value={a} onChange={e => setA(e.target.value)}/>
            <input type="number" value={b} onChange={e => setB(e.target.value)}/>
            <button onClick={handleAdd}>Start</button>
            {result !== null && <p>Result: {result}</p>}
        </div>
    );
}
