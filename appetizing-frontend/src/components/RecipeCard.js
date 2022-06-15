import axios from "axios"
import { useEffect, useState } from "react"
import { variables } from "../Variables"
import CustomImage from "./CustomImage"

export default function RecipeCard({recipe, onDelete, viewRecipe}) {
    
    const [authorImage, setAuthorImage] = useState('');
    const [loading, setLoading] = useState(true);

    const userAPI = (url = variables.API_URL + 'User/') => {
        return {
            getUser: (id) => axios.get(url + id)
        }
    }

   

    useEffect(() => {
        if(loading === true) {
            setAuthorImagePreview(recipe.authorId);
        }
    })

    const setAuthorImagePreview = (authorId) => {
        userAPI().getUser(authorId)
        .then(res => {
            setAuthorImage(res.data.imageSrc);
            setLoading(false);
        })
    }


    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.imageSrc} pt="65%"/>
            <div className="recipe-card-info">
                <img className="author-img" src={authorImage} alt=""/>
                <p className="recipe-title">{recipe.name}</p>
                <p className="recipe-description">{recipe.description}</p>
                <button className="view-recipe-btn" onClick={() => {viewRecipe(recipe)}}>EDIT</button>
                <button className="delete-recipe-btn" onClick={() => {onDelete(recipe)}}>DELETE</button>              
                <div>
                </div>
            </div>
        </div>
    )
}