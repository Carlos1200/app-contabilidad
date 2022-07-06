import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, NewRow } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewRow />} />
        <Route path="/:id" element={<NewRow />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
