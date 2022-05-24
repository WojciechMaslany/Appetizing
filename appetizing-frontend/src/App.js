import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Recipe } from "./components/Recipe"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>

      <nav>
        <ul>
          <li>
            <NavLink to="/recipe">Recipes</NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/recipe" element={<Recipe/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
