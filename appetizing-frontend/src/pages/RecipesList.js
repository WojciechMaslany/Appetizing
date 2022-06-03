import Searches from "../components/Searches"
import RecipeCard from "../components/RecipeCard"
import useFetch from "../useFetch";
import { variables } from "../Variables"
import axios from "axios";
import { useState } from "react";

const defaultImageSrc = 'img/gallery/cod.jpg'

const initialFieldValues = {
    recipeName: '',
    recipeDescription: '',
    imageName: '',
    imageSrc: defaultImageSrc,
    imageFile: null
}

export default function RecipesList() {
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});
    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]:value
        })
    }

    const recipeAPI = (url = variables.API_URL + 'Recipe/AddRecipe') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
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
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile);
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }

    const validate = () => {
        let temp = {};
        temp.recipeName = values.recipeName=== "" ? false  : true;
        temp.imageSrc = values.imageSrc=== defaultImageSrc ? false : true;
        temp.recipeDescription = values.recipeDescription === "" ? false : true;
        setErrors(temp);
        return Object.values(temp).every(x => x===true);
    }

    const resetForm = () => {
        setValues(initialFieldValues);
        document.getElementById('image-uploader').value = null;
        setErrors({});
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        if(validate()) {
            const formData = new FormData();
            values.imageName = values.imageFile.name;
            formData.append('name', values.recipeName);
            formData.append('description', values.recipeDescription);
            formData.append('imageName', values.imageName);
            formData.append('imageFile', values.imageFile);
            addOrEdit(formData, resetForm);
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] === false)?' invalid-field': '')

    // const { data, loading, error } = useFetch(variables.API_URL+'Recipe/GetRecipes');
    
    // if (loading) console.log("im loading")
    // if (error) console.log(error);
    // const recipes = data;

    // const makePostRequest = async () => {
    //     let res = await axios.post(variables.API_URL+'Recipe/AddRecipe', {name: "Testing321",
    //     description: "Testing123",                            
    //     })
    //     console.log(res);
    // };

    // const [image, setImage] = useState('');
    // const handleChange = (e) => {
    //     console.log(e.target.files);
    //     setImage(e.target.files[0])
    // }

    const addOrEdit = (formData, onSuccess) => {
        recipeAPI().create(formData)
        .then(res => {
            onSuccess();
        })
        .catch(err => console.log(err))
    }

    // const handleApi = async () => {
    //     const formData = new FormData();
    //     formData.append('name', 'Test987')
    //     formData.append('description', 'Test987')
    //     formData.append('imageName', 'Test987')
    //     formData.append('imageFile', 'Test987')
    //     console.log(formData);
    //     let res = await axios.post(variables.API_URL+'Recipe/AddRecipe', {formData                      
    //     })
    //     console.log(res);
    // }

    return (
        <div>
            <Searches/>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div>
                    <img src={values.imageSrc} className="img-preview" alt=""/>
                    <div>
                        <div>
                            <input type="file" accept="image/*" className={"form-file" + applyErrorClass('imageSrc')}
                            onChange={showPreview} id="image-uploader" />
                        </div>
                        <div>
                            <input placeholder="Recipe Name" name="recipeName" className={"form-control" + applyErrorClass('recipeName')}
                                value={values.recipeName}
                                onChange = {handleInputChange} />
                        </div>
                        <div>
                            <input placeholder="Recipe Description" name="recipeDescription" className={"form-control" + applyErrorClass('recipeDescription')}
                                value={values.recipeDescription}
                                onChange = {handleInputChange} />
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>

            {/* <div className="recipe-card-container">
                {recipes?.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe}/>
                ))}
            </div> */}
        </div>
    )
}

{/* <button onClick={makePostRequest}>Add Recipe</button>
            <div>
                IMAGE UPLOAD
                <input type="file" onChange={handleChange}/>
                <button onClick={handleApi}>SUBMIT</button>
            </div> */}