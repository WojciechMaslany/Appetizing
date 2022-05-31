import ChefCard from "./ChefCard";

export default function ChefsSection() {
    const chefs = [
        {
            name: "Bluebird",
            img: "/img/top-chefs/bluebird.jpg",
            recipesCount: "10",
            cuisine: "Italian",
        },
        {
            name: "Dahiana",
            img: "/img/top-chefs/dahiana.jpg",
            recipesCount: "5",
            cuisine: "French",
        },
        {
            name: "Kristine",
            img: "/img/top-chefs/kristine.jpg",
            recipesCount: "13",
            cuisine: "American",
        },
        {
            name: "Louis",
            img: "/img/top-chefs/louis.jpg",
            recipesCount: "8",
            cuisine: "Mexican"
        },
        {
            name: "Cheng",
            img: "/img/top-chefs/cheng.jpg",
            recipesCount: "9",
            cuisine: "Asian"
        },
        {
            name: "Sebastian",
            img: "/img/top-chefs/sebastian.jpg",
            recipesCount: "4",
            cuisine: "African"
        }
    ]

    return (
        <div className="section chefs">
            <h1 className="title">Top Chefs:</h1>
            <div className="top-chefs-container">
            { chefs.map(chef => <ChefCard key={chef.name} chef={chef} />) }
            </div>
        </div>
    )
}