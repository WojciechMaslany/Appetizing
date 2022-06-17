import { useParams } from "react-router-dom";
import { variables } from "../Variables"
import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";

export default function ViewRecipe() {

    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));

    const [values, setValues] = useState({
        id: null,
        name: '',
        description: '',
        imageName: '',
        imageSrc: null,
        imageFile: null,
        cuisineType: '',
        mealType: '',
        authorId: '',
        instructions: '',
        ingredients: []
    });
    const [commentsList, setCommentsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState({
        recipeId: id,
        authorId: user.id,
        commentBody: '',
    });

    useEffect(() => {
        if(loading === true) {
            refreshRecipe();
            populateComments();
        }     
    },)

    const handleInputChange = e => {
        const { name, value } = e.target;
        setComment({
            ...comment,
            [name]:value
        })
    }

    const recipeAPI = (url = variables.API_URL + 'Recipe/') => {
        return {
            fetch: (id) => axios.get(url + "GetRecipe/" + id),
            delete: (id, imageName) => axios.delete(`${url}DeleteRecipe/${id}/${imageName}`),
            update: (updatedRecord) => axios.put(url + "UpdateRecipe", updatedRecord)
        }
    }

    const commentsAPI = (url = variables.API_URL) => {
        return {
            getComments: (id) => axios.get(url + "Comment?id=" + id),
            postComment: (comment) => axios.post(url + "Comment", comment)
        }
    }

    function submitComment() {
        commentsAPI().postComment(comment)
        .then(res => {
            setComment({
                ...comment,
                commentBody: ''
            })
            refreshRecipe();
            populateComments();
        })
    }

    function refreshRecipe() {
        setLoading(true);
        recipeAPI().fetch(id)
        .then(res => {
            setValues(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }

    function populateComments() {
        setLoading(true);
        commentsAPI().getComments(id)
        .then(res => {
            setCommentsList(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }

    return (
        <div>
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={values.imageSrc}
                        className="card-img" alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{values.name}</h5>
                            <p className="card-text">Cuisine: {values.cuisineType}</p>
                            <p className="card-text">Meal: {values.mealType}</p>
                            <p className="card-text">Description: {values.description}</p>
                            <p className="card-text">Instructions: {values.instructions}</p>
                            <p className="card-text">Ingredients: {values.ingredients.map((ingredient) =>
                                <li>{ingredient}</li>
                            )    
                            }</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="input-group">
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" 
                    type="button"
                    onClick={submitComment}>Submit comment</button>
                </div>
                <textarea style={{marginLeft: '10px'}} 
                className="form-control" 
                aria-label="With textarea"
                placeholder="Write your comment here..."
                name="commentBody"
                value={comment.commentBody}
                onChange = {handleInputChange}></textarea>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-5 col-md-6 col-12 pb-4">
                        {commentsList.map((comment, key) => {
                            return (
                                <Comment key={key} comment={comment}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}