import axios from "axios"
import { useEffect, useState } from "react"
import { variables } from "../Variables"
import CustomImage from "./CustomImage"

export default function RecipeCard({recipe, onDelete, editRecipe, viewRecipe}) {
    
    const [authorImage, setAuthorImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');
    

    const userAPI = (url = variables.API_URL + 'User/') => {
        return {
            getUser: (id) => axios.get(url + id)
        }
    }

    useEffect(() => {
        if(loading === true) {
            checkOwner();
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

    function checkOwner() {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setUserId(user.id);
        }
    }


    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.imageSrc} pt="65%"/>
            <div className="recipe-card-info">
                <img className="author-img" src={authorImage} alt=""/>
                <p className="recipe-title">{recipe.name}</p>
                <p className="recipe-description">{recipe.description}</p>
                {recipe.authorId === userId ? 
                <button className="view-recipe-btn" onClick={() => {editRecipe(recipe)}}>EDIT</button> :
                <button className="view-recipe-btn" onClick={() => {viewRecipe(recipe)}}>VIEW</button> }
                {recipe.authorId === userId ?
                <button className="delete-recipe-btn" onClick={() => {onDelete(recipe)}}>DELETE</button>:
                null}         
                <div>
                </div>
            </div>
        </div>
    )
}