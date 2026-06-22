import { useOutletContext, useParams } from "react-router";

const Post = () => {
    const { backendData  = [] } = useOutletContext();

    const { id } = useParams();

    console.log(id);
    return(
        <>
            <h1>You did it!</h1>
            
        </>
    )
};


export default Post;