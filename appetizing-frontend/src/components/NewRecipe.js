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
        instructions: ''
    });
    const [errors, setErrors] = useState({});
    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]:value
        })
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
            addOrEdit(formData, resetForm);
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] === false)?' invalid-field': '')

    const navigate = useNavigate(); 

    const addOrEdit = (formData, onSuccess) => {
        recipeAPI().create(formData)
        .then(res => {
            onSuccess();
            navigate("/recipe/" + res.data.id)
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
                        <div>
                            <textarea placeholder="Recipe Instructions" name="instructions" className={"form-control" + applyErrorClass('recipeInstructions')}
                                value={values.instructions}
                                onChange = {handleInputChange} />
                        </div>
                        <select name="cuisineType" id="cuisineType" onChange = {handleInputChange} value={values.cuisineType}>
                            <option value={values.cuisineType = "Asian"}>Asian</option>
                            <option value={values.cuisineType = "Polish"}>Polish</option>
                            <option value={values.cuisineType = "Italian"}>Italian</option>
                            <option value={values.cuisineType = "French"}>French</option>
                        </select>
                        <select name="mealType" id="mealType" onChange = {handleInputChange} value={values.mealType}>
                            <option value={values.mealType = "breakfast"}>Breakfast</option>
                            <option value={values.mealType = "dinner"}>Dinner</option>
                            <option value={values.mealType = "supper"}>Supper</option>
                            <option value={values.mealType = "dessert"}>Dessert</option>
                        </select>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
    )
}