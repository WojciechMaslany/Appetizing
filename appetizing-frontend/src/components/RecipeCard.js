import CustomImage from "./CustomImage"

export default function RecipeCard({recipe}) {
    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.image} pt="65%"/>
            <div className="recipe-card-info">
                <img className="author-img" src={recipe.authorImg} alt=""/>
                <p className="recipe-title">{recipe.name}</p>
                <p className="recipe-description">{recipe.description}</p>
                <a className="view-recipe-btn" href="#!">VIEW RECIPE</a>
            </div>
        </div>
    )
}