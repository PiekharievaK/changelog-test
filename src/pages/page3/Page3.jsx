import {MathBlock} from "../../conponents/mathblock/mathBlock.jsx";

export default function MultiplyPage() {

  const action1 = '+'
    const action2 = '-'
    const action3 = '*'
  return (
    <div>
        <MathBlock action={action1} />
        <MathBlock action={action2} />
        <MathBlock action={action3} />
    </div>
  );
}
