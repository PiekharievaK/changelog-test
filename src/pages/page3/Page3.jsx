import { useState } from "react";
import {handleMath} from "../../utils/utils.js";

export default function MultiplyPage() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [result, setResult] = useState(null);

  const action1 = '-'
    const action2 = '+'
    const action3 = '*'
  return (
    <div>
      <h2>{action}</h2>
      <input type="number" value={a} onChange={e => setA(e.target.value)} />
      <input type="number" value={b} onChange={e => setB(e.target.value)} />
      <button onClick={() => handleMath(a, b, action , setResult)}>Start</button>
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
}
