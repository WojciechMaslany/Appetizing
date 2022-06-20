import RecipeCard from "../components/RecipeCard"
import { variables } from "../Variables"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

export default function RecipesList() {

    const [recipeList, setRecipeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        if(loading === true) {
            refreshRecipeList();
        }
    },)

    const recipeAPI = (url = variables.API_URL + 'Recipe/') => {
        return {
            fetchAll: () => axios.get(url + "GetRecipes"),
            getAllByCuisine: (ciusine) => axios.get(`${url}SortByCuisine?cuisine=${ciusine}`),
            getAllByMealType: (mealType) => axios.get(`${url}SortByMealType?mealType=${mealType}`),
            create: newRecord => axios.post(url + "AddRecipe", newRecord),
            update: (updatedRecord) => axios.put(url + "UpdateRecipe", updatedRecord),
            delete: (id, imageName) => axios.delete(`${url}DeleteRecipe/${id}/${imageName}`),
            addToFav: (updatedRecord) => axios.put(url + "AddFavorite", updatedRecord)
        }
    }

    function refreshRecipeList() {
        setLoading(true);
        if(localStorage.getItem('user') != null) {
            setIsUserLoggedIn(true);
        }
        recipeAPI().fetchAll()
        .then(res => {
            setRecipeList(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }

    const onDelete = (recipe) => { 
        recipeAPI().delete(recipe.id, recipe.imageName)
        .then(res => refreshRecipeList())
        .catch(err => console.log(err))
    }

    const sortByCuisine = (cuisine) => {
        recipeAPI().getAllByCuisine(cuisine)
        .then(res => {
            setRecipeList(res.data);
        })
        .catch(err => console.log(err))
    }

    const sortByMealType = (mealType) => {
        recipeAPI().getAllByMealType(mealType)
        .then(res => {
            setRecipeList(res.data);
        })
        .catch(err => console.log(err))
    }

    const navigate = useNavigate();

    const editRecipe = (recipe) => {
        navigate("/recipe/" + recipe.id)
    }

    const viewRecipe = (recipe) => {
        navigate("/viewRecipe/" + recipe.id)
    }

    const addToFavorites = (recipe) => {
        const user = JSON.parse(localStorage.getItem('user'))
        recipeAPI().addToFav(recipe)
        .then(res => {
            console.log(res.data);
        })
    }

    return (
        <div className="any-item">
        <div className="recipes-list-actions" style={{margin: 'auto'}}>
                <div className="action-items-container">  
                    <div className="action-item"><Link style={{ textDecoration: 'none', color: '#fff'}} to={"/recipe"}>Add Recipe</Link></div> 
                </div> 
            </div> 
            <div className="previous-searches">
                <div className="search-box">
                    <input type="text" 
                        placeholder="Search..."
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }}
                    />
                    <button className="btn">
                        <FontAwesomeIcon style={{cursor: 'pointer'}} icon={faSearch}/>
                    </button>
                </div>
            </div>
            
            <div className="recipes-list-actions">
                <h2>Filters</h2>
                <div className="action-items-container">
                    <div className="action-item" onClick={() => {sortByCuisine("French")}}>French</div>
                    <div className="action-item" onClick={() => {sortByCuisine("Italian")}}>Italian</div>
                    <div className="action-item" onClick={() => {sortByCuisine("Polish")}}>Polish</div>
                    <div className="action-item" onClick={() => {sortByCuisine("Asian")}}>Asian</div>
                    <div className="action-item" onClick={() => {sortByMealType("Breakfast")}}>Breakfast</div>
                    <div className="action-item" onClick={() => {sortByMealType("Dinner")}}>Dinner</div>
                    <div className="action-item" onClick={() => {sortByMealType("Supper")}}>Supper</div>
                    <div className="action-item" onClick={() => {sortByMealType("Dessert")}}>Dessert</div>
                    <div className="action-item" onClick={() => {refreshRecipeList()}}>Reset</div>
                </div> 
            </div>
            <div className="recipe-card-container">
                {recipeList.filter((recipe) => {
                    let ingredientsOfRecipe = recipe.ingredients.map(v => v.toLowerCase());
                    if (searchTerm === "") {
                        return recipe
                    } else if (recipe.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return recipe
                    } else if (ingredientsOfRecipe) {
                        for (let i = 0; i<ingredientsOfRecipe.length; i++) {
                            if(ingredientsOfRecipe[i].includes(searchTerm.toLowerCase())) {
                                return recipe;
                            }
                        }
                    }
                }).map((recipe, key) => {
                    return (
                        <RecipeCard 
                        key={key} 
                        recipe={recipe} 
                        onDelete={onDelete} 
                        editRecipe={editRecipe} 
                        viewRecipe={viewRecipe}
                        addToFavorites={addToFavorites}
                        />
                    )
                })}
            </div> 
        </div>
    )
}