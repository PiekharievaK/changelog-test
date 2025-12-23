import { useState } from "react";

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
            {/*<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It </p>*/}

        </div>
    );
}
