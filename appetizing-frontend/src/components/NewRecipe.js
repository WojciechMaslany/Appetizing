import { variables } from "../Variables"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewRecipe () {

    const [values, setValues] = useState({
        name: '',
        description: '',
        imageName: '',
        imageSrc: "/img/gallery/no_image.jpg",
        imageFile: null,
        cuisineType: '',
        mealType: '',
        authorId: '',
        instructions: '',
        ingredients: [],
        likes: {
            isLiked: false,
            authorId: [],
            userId: ''
        }
    });
    const [errors, setErrors] = useState({});
    const [ingredient, setIngriedient] = useState('');
    const [ingredientsArray, setIngredientsArray] = useState([])
    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]:value
        })
    }

    const handleIngriedientChange = e => {
        const { name, value } = e.target;
        setIngriedient(value);
    }

    function addIngredient () {
        if(ingredientsArray != null) {
            let someArray = ingredientsArray;
            someArray.push(ingredient);
            setIngredientsArray(someArray);
        } else {
            setIngredientsArray([ingredient])
        }
        
        setIngriedient('');
    }

    const recipeAPI = (url = variables.API_URL + 'Recipe/') => {
        return {
            create: newRecord => axios.post(url + "AddRecipe", newRecord)
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
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('imageName', values.imageName);
            formData.append('imageFile', values.imageFile);
            formData.append('cuisineType', values.cuisineType);
            formData.append('mealType', values.mealType);
            formData.append('authorId', user.id);
            formData.append('instructions', values.instructions);
            
            for(let likesKey in values['likes']) {
                formData.append(`likes[${likesKey}]`, values['likes'][likesKey]);
            }
                
            for (let i = 0; i < ingredientsArray.length; i++) {
                formData.append('ingredients', ingredientsArray[i])
            }
            addOrEdit(formData, resetForm);
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] === false)?' invalid-field': '')

    const navigate = useNavigate(); 

    const addOrEdit = (formData, onSuccess) => {
        recipeAPI().create(formData)
        .then(res => {
            onSuccess();
            navigate("/viewRecipe/" + res.data.id)
        })
        .catch(err => console.log(err))
    }

    return(
        <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div>
                    <img src={values.imageSrc} className="img-preview" alt=""/>
                    <div>
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
                        <div className="form-control">
                            {ingredientsArray}
                        </div>
                        <div>
                            <input placeholder="Add ingredient..." name="ingredient" className={"form-control" + applyErrorClass('recipeIngredient')}
                                value={ingredient}
                                onChange = {handleIngriedientChange} />
                            <div onClick={addIngredient}>Add</div>
                        </div>
                        <div>
                            <textarea placeholder="Recipe Instructions" name="instructions" className={"form-control" + applyErrorClass('recipeInstructions')}
                                value={values.instructions}
                                onChange = {handleInputChange} />
                        </div>
                        <select name="cuisineType" onChange = {handleInputChange} value={values.cuisineType}>
                            <option value={"Asian"}>Asian</option>
                            <option value={"Polish"}>Polish</option>
                            <option value={"Italian"}>Italian</option>
                            <option value={"French"}>French</option>
                        </select>
                        <select name="mealType" onChange = {handleInputChange} value={values.mealType}>
                            <option value={"Breakfast"}>Breakfast</option>
                            <option value={"Dinner"}>Dinner</option>
                            <option value={"Supper"}>Supper</option>
                            <option value={"Dessert"}>Dessert</option>
                        </select>
                        <div>
                            <button className="btn" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
    )
}