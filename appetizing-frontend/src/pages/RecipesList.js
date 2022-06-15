import Searches from "../components/Searches"
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

    useEffect(() => {
        if(loading === true) {
            refreshRecipeList();
        }
    },)

    const recipeAPI = (url = variables.API_URL + 'Recipe/') => {
        return {
            fetchAll: () => axios.get(url + "GetRecipes"),
            getAllByCuisine: () => axios.get(url + "SortByCuisine?cuisine=French"),
            getAllByMealType: () => axios.get(url + "SortByMealType?mealType=dessert"),
            create: newRecord => axios.post(url + "AddRecipe", newRecord),
            update: (updatedRecord) => axios.put(url + "UpdateRecipe", updatedRecord),
            delete: (id, imageName) => axios.delete(`${url}DeleteRecipe/${id}/${imageName}`)
        }
    }

    function refreshRecipeList() {
        setLoading(true);
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

    const sortByCuisine = () => {
        recipeAPI().getAllByCuisine()
        .then(res => {
            setRecipeList(res.data);
        })
        .catch(err => console.log(err))
    }

    const sortByMealType = () => {
        recipeAPI().getAllByMealType()
        .then(res => {
            setRecipeList(res.data);
        })
        .catch(err => console.log(err))
    }

    const navigate = useNavigate();

    const viewRecipe = (recipe) => {
        navigate("/recipe/" + recipe.id)
    }

    return (
        <div>
            {/* <Searches/> */}
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
                    <div className="action-item"><Link style={{ textDecoration: 'none', color: '#fff'}} to={"/recipe"}>Add Recipe</Link></div>
                    <div className="action-item" onClick={sortByCuisine}>Get All French</div>
                    <div className="action-item" onClick={sortByMealType}>Get All Desserts</div>
                </div> 
            </div>
            <div className="recipe-card-container">
                {recipeList.filter((recipe) => {
                    if (searchTerm === "") {
                        return recipe
                    } else if (recipe.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return recipe
                    }
                }).map((recipe, key) => {
                    return (
                        <RecipeCard key={key} recipe={recipe} onDelete={onDelete} viewRecipe={viewRecipe}/>
                    )
                })}
            </div> 
        </div>
    )
}