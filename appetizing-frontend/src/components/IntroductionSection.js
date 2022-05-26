import CustomImage from "./CustomImage"

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

    return (
        <div className="section intro">
            <div className="col typography">
                <h1 className="title">What are we about</h1>
                <p className="info">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                <button className="btn">Explore now</button>
            </div>
            <div className="col gallery">
                { images.map((src, index) => (
                    <CustomImage key={index} imgSrc={src} pt={"90%"}/>
                ))}
            </div>
        </div>
    )
}