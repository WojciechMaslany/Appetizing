import { useNavigate } from "react-router-dom";

export default function Improve(props) {
    const list = [
        "Learn new recipes",
        "Experiment with food",
        "Write your own recipes",
        "Get to know nutrition facts",
        "Get cooking tips",
        "Get ranked"
    ]

    const navigate = useNavigate();

    const goToRegistration = () => {
        navigate("/register")
    }

    return (
        <div className="section improve">
            <div className="col img">
                <img src="/img/gallery/creamy_pea_soup.jpg" alt=""/>
            </div>
            <div className="col typography">
                <h1 className="title">Gain new skills</h1>
                { list.map((item, index) => (
                    <p className="skill-item" key={index}>{item}</p>
                ))}
                <button className="btn" onClick={() => {goToRegistration()}}>Signup now</button>
            </div>
        </div>
    )
}