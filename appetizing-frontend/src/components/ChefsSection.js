import ChefCard from "./ChefCard";
import { variables } from "../Variables";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ChefsSection() {
    
    const [chefs, setChefs] = useState([]);
    const [loading, setLoading] = useState(true);

    const userAPI = (url = variables.API_URL + 'User/') => {
        return {
            getTopUsers: () => axios.get(url + "GetTopUsers")
        }
    }

    useEffect(() => {
        if(loading === true) {
            getTopChefs();
        }
    },)

    function getTopChefs() {
        userAPI().getTopUsers()
        .then(res =>
            setChefs(res.data),
            setLoading(false)
        )
    }

    return (
        <div className="appsection chefs">
            <h1 className="title">Top Chefs:</h1>
            <div className="top-chefs-container">
            { chefs.map(chef => <ChefCard key={chef.name} chef={chef} />) }
            </div>
        </div>
    )
}