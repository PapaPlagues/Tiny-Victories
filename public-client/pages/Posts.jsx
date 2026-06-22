import { useOutletContext } from "react-router";

const Posts = () => {
    
    const { backendData = [] } = useOutletContext();

    return(
        <>
            <h1>My posts :D</h1>
        
        </>
    )
}

export default Posts;