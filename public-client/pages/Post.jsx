import { useOutletContext } from "react-router";

const Post = () => {

    const { backendData  = [] } = useOutletContext();
    
    return(
        <>
            <h1>You did it!</h1>
            
        </>
    )
};


export default Post;