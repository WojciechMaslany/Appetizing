import { 
  BrowserRouter as Router, 
  Route, 
  Routes 
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from "react";
import { connect } from "react-redux";
import Home from "./pages/Home";
import RecipesList from "./pages/RecipesList";
import Settings from "./pages/Settings";
import  Recipe  from "./components/Recipe"
import  Login  from "./components/Login"
import Admin from "./components/Admin";
import Profile from "./components/Profile"
import Register from "./components/Register"
import NewRecipe from "./components/NewRecipe"
import ViewRecipe from "./components/ViewRecipe";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from './helpers/history';
import { Link} from "react-router-dom";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }
  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillMount() {
    const user = this.props.user;
    if(user) {
      this.setState({
        currentUser: user
      });
    }
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      currentUser: undefined
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar">
            <Link to={"/"} className="logo">
              <span>App</span>etizing
            </Link>

            {currentUser ? (
              <div className="nav-links" >
                  {currentUser.role === "Admin" ? (
                    <Link to={"/admin"} className="/admmin active">
                      Admin Panel
                    </Link>) : (null)
                  }
                  
                  <Link to={"/recipes"} className="/login active">
                    Recipes
                  </Link>
                  <Link to={"/profile"} className="/profile active">
                    { currentUser.username }
                  </Link>
                  <Link to={"/login"} className="/logout active" onClick={ this.logOut }>
                    LogOut
                  </Link>
              </div>
            ) : (
              <div className="nav-links">
                  <Link to={"/recipes"} className="/login active">
                    Recipes
                  </Link>
                  <Link to={"/login"} className="/login active">
                    Login
                  </Link>
                  <Link to={"/register"} className="/register active">
                    Sign Up
                  </Link>
              </div>
            )}
          </nav>
          <div className="container main">
            <Routes>
              <Route path="/" element= {<Home/>} />
              <Route path="/home" element= {<Home/>} />
              <Route path="/login" element= {<Login/>}/>
              <Route path="/recipes" element= {<RecipesList/>} />
              <Route path="/settings" element= {<Settings/>} />
              <Route path="/recipe/:id" element={<Recipe/>}/>
              <Route path="/viewRecipe/:id" element={<ViewRecipe/>}/>
              <Route path="/recipe" element={<NewRecipe/>}/>
              <Route path="/profile" element= {<Profile/>}/>
              <Route path="/register" element= {<Register/>}/>
              <Route path="/admin" element= {<Admin/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
