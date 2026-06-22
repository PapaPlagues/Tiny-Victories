import { useOutletContext } from "react-router";
import PostList from "../src/components/PostList";
import '../styles/Posts.css';

const Posts = () => {
    const { backendData = [] } = useOutletContext();

    return(
        <>
            <header className="posts-header">
                <div className="posts-header-inner">
                    <h1>My <span className="brand">Tiny Victories</span></h1>

                    <p className="posts-subtitle">
                        A collection of projects, experiments, and things I'm figuring out.
                    </p> 

                    <form action="">
                        <label htmlFor="">Search </label>
                        <input type="text" />
                    </form>

                    {/* labels to click on? */}
                </div>

                
            </header>

            <section id='posts-body'>
                <PostList posts={backendData}/>
            </section>
        </>
    )
};

export default Posts;