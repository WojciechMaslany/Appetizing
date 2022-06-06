import { useParams } from "react-router-dom";
import { variables } from "../Variables"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Recipe () {

    const { id } = useParams();

    const [values, setValues] = useState({
        id: null,
        name: '',
        description: '',
        imageName: '',
        imageSrc: null,
        imageFile: null
    });
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
        }       
    },)

    const recipeAPI = (url = variables.API_URL + 'Recipe/') => {
        return {
            fetch: (id) => axios.get(url + "GetRecipe/" + id),
            delete: (id, imageName) => axios.delete(`${url}DeleteRecipe/${id}/${imageName}`)
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
        e.preventDefault()
        if(validate()) {
            const formData = new FormData();
            if(values.id != null) {
                formData.append('id', values.id)
            }
            formData.append('name', values.recipeName);
            formData.append('description', values.recipeDescription);
            formData.append('imageName', values.imageName);
            formData.append('imageFile', values.imageFile);
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

    const deleteRecipe = () => {
        recipeAPI().delete(id, values.imageName)
        .then(res => console.log("Gg"))
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
                            <button type="submit">Submit</button>
                        </div>
                        <div>
                            <button onClick={deleteRecipe}>Delete</button>
                        </div>
                    </div>
                </div>
            </form>
    )
}