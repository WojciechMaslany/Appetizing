import Searches from "../components/Searches"
import RecipeCard from "../components/RecipeCard"
import useFetch from "../useFetch";
import { variables } from "../Variables"

export default function RecipesList() {

    const { data, loading, error } = useFetch(variables.API_URL+'Recipe/GetRecipes');
    
    if (loading) console.log("im loading")
    if (error) console.log(error);
    const recipes = data;

    return (
        <div>
            <Searches/>
            <div className="recipe-card-container">
                {recipes?.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe}/>
                ))}
            </div>
        </div>
    )
}