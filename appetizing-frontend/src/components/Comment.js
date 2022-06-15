import axios from "axios"
import { useEffect, useState } from "react"
import { variables } from "../Variables"

export default function Comment({comment}) {

    const [authorImage, setAuthorImage] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [loading, setLoading] = useState(true);

    const userAPI = (url = variables.API_URL + 'User/') => {
        return {
            getUser: (id) => axios.get(url + id)
        }
    }

    useEffect(() => {
        if(loading === true) {
            setAuthorImagePreview(comment.authorId);
        }
    })

    const setAuthorImagePreview = (authorId) => {
        userAPI().getUser(authorId)
        .then(res => {
            setAuthorImage(res.data.imageSrc);
            setAuthorName(res.data.username);
            setLoading(false);
        })
    }

    return (
        // <div className="comment">
        //     <div className="comment-info">
        //         <img className="author-img" src={authorImage} alt=""/>
        //         <p className="comment-body">{comment.commentBody}</p>
        //     </div>
        // </div>
        
        
        <div class="comment mt-4 text-justify float-left">
                <img src={authorImage} alt="" class="rounded-circle" width="40" height="40"/>
                <h4>{authorName}</h4>
                <span>{comment.date}</span>
                <br/>
            <p>{comment.commentBody}</p>
        </div>        
    )
}