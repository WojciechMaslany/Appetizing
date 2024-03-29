import CustomImage from "./CustomImage"
import { useNavigate } from "react-router-dom";

export default function IntroductionSection() {

    const images = [
        "/img/gallery/bolognese.jpg",
        "/img/gallery/bruschetta.jpg",
        "/img/gallery/cheesecake.jpg",
        "/img/gallery/cod.jpg",
        "/img/gallery/french_toast.jpg",
        "/img/gallery/pancakes.jpg",
        "/img/gallery/pizza.jpg",
        "/img/gallery/tuscan_chicken.jpg",
        "/img/gallery/yellow_curry_minced_pork.jpg"
    ]

    const navigate = useNavigate();

    const goToRecipes = () => {
        navigate("/recipes")
    }

    return (
        <div className="section intro">
            <div className="col typography">
                <h1 className="title">What are we about</h1>
                <p className="info">Appetizing is a portal designed for food passionates. Click on the button bellow to check out what we have to offer.</p>
                <button className="btn" onClick={() => {goToRecipes()}}>Explore now</button>
            </div>
            <div className="col gallery">
                { images.map((src, index) => (
                    <CustomImage key={index} imgSrc={src} pt={"90%"}/>
                ))}
            </div>
        </div>
    )
}