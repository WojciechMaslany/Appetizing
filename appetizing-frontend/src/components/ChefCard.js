import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"

export default function ChefCard({chef}) {
    return (
        <div className="chef-card">
            <img src={chef.imageSrc} alt="" />
            <div className="chef-card-info">
                <h3 className="chef-card-name">{chef.username}</h3>
                <p className="chef-recipe-count">Recipes: <b>{chef.userRecipesCount}</b></p>
                <p className="chef-cuisine">Ciusine: <b>{chef.userFavoriteCuisine}</b></p>
                <p className="chef-icons">
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faInstagram} />
                </p>
            </div>
        </div>
    )
}