import CustomImage from "./CustomImage"
import {Link} from "react-router-dom"

export default function RecipeCard({recipe, onDelete, showRecordDetails}) {

    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.imageSrc} pt="65%"/>
            <div className="recipe-card-info">
                <img className="author-img" src={recipe.authorImg} alt=""/>
                <p className="recipe-title">{recipe.name}</p>
                <p className="recipe-description">{recipe.description}</p>
                <button className="view-recipe-btn" onClick={() => {showRecordDetails(recipe)}}>VIEW</button>
                <button className="delete-recipe-btn" onClick={() => {onDelete(recipe)}}>DELETE</button>
                <button><Link to={"/recipe/"+recipe.id}>View Recipe</Link></button>
                <div>
                </div>
            </div>
        </div>
    )
}