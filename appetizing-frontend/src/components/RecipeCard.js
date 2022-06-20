import axios from "axios"
import { useEffect, useState } from "react"
import { variables } from "../Variables"
import CustomImage from "./CustomImage"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from "@fortawesome/free-solid-svg-icons"

export default function RecipeCard({recipe, onDelete, editRecipe, viewRecipe, addToFavorites}) {
    
    const [authorImage, setAuthorImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const [favorite, setFavorite] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'))
    

    const userAPI = (url = variables.API_URL + 'User/') => {
        return {
            getUser: (id) => axios.get(url + id)
        }
    }

    useEffect(() => {
        if(loading === true) {
            checkOwner();
            let isItThere = recipe.likes.authorId.find(element => element === user.id)
            if (isItThere) {
                setFavorite(true);
            }
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
        if (user) {
            setUserId(user.id);
        }
    }

    const prepareFavorite = (recipe) => {
        recipe.likes.userId = user.id;
        if (favorite === false) {
            setFavorite(true);
            recipe.likes.isLiked = true;
            addToFavorites(recipe);
        }
        else {
            setFavorite(false);
            recipe.likes.isLiked = false;
            addToFavorites(recipe);
        }
    }

    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.imageSrc} pt="65%"/>
            
            <div style={{
                color: favorite ? '#ff0056' : 'white' , 
                zIndex: '3', 
                position: 'absolute', 
                marginTop: '20px',
                marginLeft: '20px', 
                left: '0',
                top: '0'
                }}><FontAwesomeIcon style={{cursor: 'pointer'}} onClick={()=>{prepareFavorite(recipe)}} icon={faHeart} />
            </div>
            <div className="recipe-card-info">
                <img className="author-img" src={authorImage} alt=""/>
                <p className="recipe-title">{recipe.name}</p>
                <p className="recipe-description">{recipe.description}</p>
                <button className="view-recipe-btn" onClick={() => {viewRecipe(recipe)}}>VIEW</button>
                {recipe.authorId === userId ? 
                <button style={{paddingLeft: '15px'}} className="view-recipe-btn" onClick={() => {editRecipe(recipe)}}>EDIT</button> :
                null }
                {recipe.authorId === userId ?
                <button className="delete-recipe-btn" onClick={() => {onDelete(recipe)}}>DELETE</button>:
                null}         
            </div>
        </div>
    )
}