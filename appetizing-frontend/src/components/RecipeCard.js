import CustomImage from "./CustomImage"

export default function RecipeCard({recipe}) {
    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.image} pt="65%"/>
            <div className="recipe-card-info">
                <img className="author-img" src={recipe.authorImg} alt=""/>
                <p className="recipe-title">{recipe.title}</p>
                <p className="recipe-description">Bruschetta is an antipasto from Italy consisting of grilled bread rubbed with garlic and topped with olive oil and salt. Variations may include toppings of tomato, vegetables, beans, cured meat, or cheese.</p>
                <a className="view-recipe-btn" href="#!">VIEW RECIPE</a>
            </div>
        </div>
    )
}