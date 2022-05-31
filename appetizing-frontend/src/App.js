// import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import IntroductionSection from "./components/IntroductionSection";
import Improve from "./components/ImproveSection";
import ChefsSection from "./components/ChefsSection";
// import { Recipe } from "./components/Recipe"

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container main">
        <IntroductionSection/>
        <Improve/>
        <ChefsSection/>
      </div>
    </div>
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
