import PostList from "../src/components/PostList";
import "../styles/Homepage.css";
import heroImage from "../src/assets/pexels-timmossholder-3260289.jpg"
import { useOutletContext } from "react-router";

const Homepage = () => {

    const { backendData = [] } = useOutletContext();

    const previewPosts = backendData.slice(0,3);

    return (
        <>
            <header className="hero">
                <div className="hero-inner">
                    <div className="hero-text">
                        <h1>Welcome to <span className="brand">Tiny Victories</span></h1>

                        <p>
                            Hello! I'm Jacob. I like building things - websites, small games, drawings, and stories.
                            Right now I'm learning web development and UX design, and this blog is where I keep everything I'm working on and figuring out.
                            It's a mix of code, art, ideas, and various other projects.
                        </p>
                        <div>
                            <a href="/posts">
                                <button className="btn" id="main-btn">Posts</button>
                            </a>
                            <a href="https://github.com/PapaPlagues">
                                <button className="btn" id="secondary-btn">Github</button>
                            </a>
                        </div>
                    </div>

                    <img src={heroImage} alt="Hero" className="hero-image"/>
                </div>
            </header>

            <section id="home-body">
                <div>
                    <h2>Latest Posts</h2>
                </div>
                
             
                <PostList posts={previewPosts}/>
                
                
                             
                <div>
                    <p><a href="/posts">View All Posts...</a></p>
                </div>
                
            </section>
        </>
    );
};


export default Homepage;