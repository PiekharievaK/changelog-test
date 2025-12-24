import {Link, Outlet} from "react-router-dom";
import {MathBlock} from "../../conponents/mathblock/mathBlock.jsx";

export const AddPage = () => {

    const action1 = "-";
    const action2 = "+";
    const action3 = "*";

    return (
        <div>
            <h2>Page   1</h2>
            <nav>
                <Link to="1">SubPage 1</Link> |{" "}
                <Link to="2">SubPage 2</Link> |{" "}
                <Link to="3">SubPage 3</Link>
            </nav>
            <div>
                <MathBlock action={action2}/>
            </div>
            <div>
                <MathBlock action={action1}/>
            </div>

            <div>
                <MathBlock action={action3}/>
            </div>
            <Outlet/>
        </div>
    );
};
