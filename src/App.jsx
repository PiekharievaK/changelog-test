import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AddPage } from "./pages/page1/Page1";
import SubtractPage from "./pages/page2/Page2";
import MultiplyPage from "./pages/page3/Page3";
import { Subpage1 } from "./pages/subpages/subpage1";
import { Subpage2 } from "./pages/subpages/subpage2";
import { Subpage3 } from "./pages/subpages/subpage3";

function App() {
    return (
        <Router>
            <div>
                <h1>Test Page</h1>
                <nav>
                    <Link to="/1">Page 1</Link> |{" "}
                    <Link to="/2">Page 2</Link> |{" "}
                    <Link to="/3">Page 3</Link>

                </nav>
                <Routes>
                    <Route path="/1" element={<AddPage />}>
                        <Route path="1" element={<Subpage1 />} />
                        <Route path="2" element={<Subpage2 />} />
                        <Route path="3" element={<Subpage3 />} />
                    </Route>

                    <Route path="/2" element={<SubtractPage />} />
                    <Route path="/3" element={<MultiplyPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
