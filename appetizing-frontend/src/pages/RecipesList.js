import Searches from "../components/Searches"
import RecipeCard from "../components/RecipeCard"

export default function RecipesList() {

    const recipes = [
        {
            title: "Cheesecake",
            image: "/img/gallery/cheesecake.jpg",
            authorImg: "/img/top-chefs/Bluebird.jpg",
        }, 
        {
            title: "Pancakes",
            image: "/img/gallery/pancakes.jpg",
            authorImg: "/img/top-chefs/cheng.jpg",
        },
        {
            title: "Bolognese",
            image: "/img/gallery/bolognese.jpg",
            authorImg: "/img/top-chefs/Sebastian.jpg",
        },
        {
            title: "Bruschetta",
            image: "/img/gallery/bruschetta.jpg",
            authorImg: "/img/top-chefs/dahiana.jpg",
        }
    ].sort(() => Math.random() - 0.5)

    return (
        <div>
            <Searches/>
            <div className="recipe-card-container">
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe}/>
                ))}
            </div>
        </div>
    )
}