import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import { variables } from "../Variables"
import axios from "axios";
import { Link} from "react-router-dom";

const recipeAPI = (url = variables.API_URL + 'Recipe/') => {
  return {
      getUserRecipes: (id) => axios.get(`${url}GetUserRecipes/${id}`),
      getFavoriteRecipes: (id) => axios.get(`${url}GetFavoriteRecipes/${id}`),
      update: (updatedRecord) => axios.put(url + "UpdateRecipe", updatedRecord),
      delete: (id, imageName) => axios.delete(`${url}DeleteRecipe/${id}/${imageName}`),
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
      favRecipeList: [],
      userId: props.user.id
    }
  }

  componentDidMount() {
    recipeAPI().getUserRecipes(this.state.userId)
    .then(res => {
      this.setState({
        recipeList: res.data
      })
    })
    recipeAPI().getFavoriteRecipes(this.state.userId)
    .then(res => {
      this.setState({
        favRecipeList: res.data
      })
    })
  }

  deleteRecipe(recipe) {
    recipeAPI().delete(recipe.id, recipe.imageName)
        .then(res => 
          recipeAPI().getUserRecipes(this.state.userId)
          .then(res2 => 
            this.setState({
              recipeList: res2.data
            })))
        .catch(err => console.log(err))
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    
    return (
      <div>
          <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col col-md-9 col-lg-7 col-xl-5">
                    <div className="card">
                      <div className="card-body p-4">
                        <div className="d-flex text-black">
                          <div className="flex-shrink-0">
                            <img src={currentUser.imageSrc}
                              alt="" className="img-fluid"
                              style={{width: '180px', borderRadius: '10px'}}/>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h5 className="mb-1">{currentUser.username}</h5>
                            <p className="mb-2 pb-1">{currentUser.email}</p>
                          <div className="d-flex justify-content-start rounded-3 p-2 mb-2">
                          <div>
                            <p className="small text-muted mb-1">Recipes</p>
                            <p className="mb-0">{currentUser.userRecipesCount}</p>
                          </div>
                          <div className="px-3">
                            <p className="small text-muted mb-1">Favorite Cuisine</p>
                            <p className="mb-0">{currentUser.userFavoriteCuisine}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>    
          <div className="container-lg">
            <h1>Your recipes:</h1>
            <div className="row">
            {this.state.recipeList.map((recipe) => {
              return (
                  <div className="col-xl-4 col-md-6 col-xxl-3">
                    <div className="card" style={{width: "300px", height: "auto"}}>
                        <img src={recipe.imageSrc} style={{width:"200px", height: "200px", objectFit: "cover", margin: "auto"}} className="card-img-top" alt="..."/>
                        <div className="card-body text-center">
                            <h5 className="card-title">{recipe.name}</h5>
                            <p className="card-text">{recipe.description}</p>
                            <button className="btn btn-primary">
                              <Link to={"/viewRecipe/" + recipe.id} style={{textDecoration: 'none', color: 'white'}}>
                                View
                              </Link>
                            </button>
                            <button className="btn btn-primary">
                              <Link to={"/recipe/" + recipe.id} style={{textDecoration: 'none', color: 'white'}}>
                                Edit
                              </Link>
                            </button>
                            <button className="btn btn-primary" onClick={() => this.deleteRecipe(recipe)}>Delete</button>
                        </div>
                    </div>
                  </div>
              )
            })}
            </div>
          </div> 
          <div className="container-lg">
            <h1>Your favorite recipes:</h1>
            <div className="row">
            {this.state.favRecipeList.map((recipe) => {
              return (
                  <div className="col-xl-4 col-md-6 col-xxl-3">
                    <div className="card" style={{width: "300px", height: "auto"}}>
                        <img src={recipe.imageSrc} style={{width:"200px", height: "200px", objectFit: "cover", margin: "auto"}} className="card-img-top" alt="..."/>
                        <div className="card-body text-center">
                            <h5 className="card-title">{recipe.name}</h5>
                            <p className="card-text">{recipe.description}</p>
                            <button className="btn btn-primary">
                              <Link to={"/viewRecipe/" + recipe.id} style={{textDecoration: 'none', color: 'white'}}>
                                View
                              </Link>
                            </button>
                        </div>
                    </div>
                  </div>
              )
            })}
            </div>
          </div> 
      </div> 
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(Profile);