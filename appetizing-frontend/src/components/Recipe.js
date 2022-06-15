import { useParams } from "react-router-dom";
import { variables } from "../Variables"
import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";

export default function Recipe () {

    const { id } = useParams();

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
        instructions: ''
    });
    const [commentsList, setCommentsList] = useState([]);
    const [errors, setErrors] = useState({});
    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]:value
        })
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(loading === true) {
            refreshRecipe();
            populateComments();
        }     
    },)

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

    const showPreview = e => {
        if(e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageName: imageFile.name,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile);
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: null
            })
        }
    }

    const validate = () => {
        let temp = {};
        temp.recipeName = values.recipeName=== "" ? false  : true;
        temp.imageSrc = values.imageSrc=== "" ? false : true;
        temp.recipeDescription = values.recipeDescription === "" ? false : true;
        setErrors(temp);
        return Object.values(temp).every(x => x===true);
    }

    const resetForm = () => {
        setValues();
        document.getElementById('image-uploader').value = null;
        setErrors({});
    }

    const handleFormSubmit = e => {
        const user = JSON.parse(localStorage.getItem('user'));
        e.preventDefault()
        if(validate()) {
            const formData = new FormData();
            if(values.id != null) {
                formData.append('id', values.id)
            }
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('imageName', values.imageName);
            formData.append('imageFile', values.imageFile);
            formData.append('cuisineType', values.cuisineType);
            formData.append('mealType', values.mealType);
            formData.append('authorId', user.id);
            formData.append('instructions', values.instructions);
            addOrEdit(formData, resetForm);
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] === false)?' invalid-field': '')

    const addOrEdit = (formData, onSuccess) => {
        if(formData.get('id') === null) {
            recipeAPI().create(formData)
            .then(res => {
                onSuccess();
                refreshRecipe();
            })
            .catch(err => console.log(err))
        }
        else {
            recipeAPI().update(formData)
        .then(res => {
            onSuccess();
            refreshRecipe();
        })
        .catch(err => console.log(err))
        }
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

    const deleteRecipe = () => {
        recipeAPI().delete(id, values.imageName)
        .then(res => console.log("Gg"))
        .catch(err => console.log(err))
    }

    return(
        <div className="any-item">
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div>
                    <img src={values.imageSrc} className="img-preview" alt=""/>
                    <div className="form-group">
                        <div>
                            <input type="file" accept="image/*" className={"form-file" + applyErrorClass('imageSrc')}
                            onChange={showPreview} id="image-uploader" />
                        </div>
                        <div>
                            <input placeholder="Recipe Name" name="name" className={"form-control" + applyErrorClass('recipeName')}
                                value={values.name}
                                onChange = {handleInputChange} />
                        </div>
                        <div>
                            <textarea placeholder="Recipe Description" name="description" className={"form-control" + applyErrorClass('recipeDescription')}
                                value={values.description}
                                onChange = {handleInputChange} />
                        </div>
                        <div>
                            <textarea placeholder="Recipe Instructions" name="instructions" className={"form-control" + applyErrorClass('recipeInstructions')}
                                value={values.instructions}
                                onChange = {handleInputChange} />
                        </div>
                        <select className="form-select" name="cuisineType" onChange = {handleInputChange} value={values.cuisineType}>
                            <option value={"Asian"}>Asian</option>
                            <option value={"Polish"}>Polish</option>
                            <option value={"Italian"}>Italian</option>
                            <option value={"French"}>French</option>
                        </select>
                        <select className="form-select" name="mealType" onChange = {handleInputChange} value={values.mealType}>
                            <option value={"breakfast"}>Breakfast</option>
                            <option value={"dinner"}>Dinner</option>
                            <option value={"supper"}>Supper</option>
                            <option value={"dessert"}>Dessert</option>
                        </select>
                        <div>
                            <button className="btn" type="submit">Submit</button>
                            <button className="btn float-right" onClick={deleteRecipe}>Delete</button>
                        </div>
                    </div>
                </div>
            </form>
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