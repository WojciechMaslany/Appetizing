import { 
  BrowserRouter as Router, 
  Route, 
  Routes 
} from "react-router-dom";


import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import RecipesList from "./pages/RecipesList";
import Settings from "./pages/Settings";
// import { Recipe } from "./components/Recipe"

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container main">
        <Routes>
          <Route path="/" element= {<Home/>} />
          <Route path="/recipes" element= {<RecipesList/>} />
          <Route path="/settings" element= {<Settings/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// <BrowserRouter>
    // <div className="App">
    //   <Navbar/>

    //   <nav>
    //     <ul>
    //       <li>
    //         <NavLink to="/recipe">Recipes</NavLink>
    //       </li>
    //     </ul>
    //   </nav>

    //   <Routes>
    //     <Route path="/recipe" element={<Recipe/>}></Route>
    //   </Routes>
    // </div>
    // </BrowserRouter>
