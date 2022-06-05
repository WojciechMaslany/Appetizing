import CustomImage from "./CustomImage"

export default function RecipeCard({recipe, props}) {

    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.imageSrc} pt="65%"/>
            <div className="recipe-card-info">
                <img className="author-img" src={recipe.authorImg} alt=""/>
                <p className="recipe-title">{recipe.name}</p>
                <p className="recipe-description">{recipe.description}</p>
                <a className="view-recipe-btn" href="#!">VIEW</a>
                <button className="delete-recipe-btn" onClick={() => {props(recipe.id)}}>DELETE</button>
            </div>
        </div>
    )
}