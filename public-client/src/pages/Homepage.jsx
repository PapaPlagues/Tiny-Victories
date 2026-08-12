import PostList from "../components/PostList";
import '../styles/Homepage.css';
import heroImage from "../assets/pexels-timmossholder-3260289.jpg";
import { useOutletContext } from "react-router";

const Homepage = () => {

    const { backendData = [] } = useOutletContext();
    const previewPosts = backendData.slice(0, 3);

    return (
        <>
            <header className="hero">
                <div className="hero-inner">
                    <div className="hero-text">
                        <h1>Welcome to <span className="brand">Tiny Victories</span></h1>

                        <p>
                           Hello! I'm Jacob. I like building websites, small games, drawings, and stories. Tiny Victories is where I document what I'm learning, building, and figuring things out.
                        </p>
                        <div>
                            <a href="/posts" className="btn" id="main-btn">
                                Posts
                            </a>
                            <a href="https://github.com/PapaPlagues" className="btn" id="secondary-btn">
                               Github
                            </a>
                        </div>
                    </div>

                    <img src={heroImage} alt="Hero" className="hero-image"/>
                </div>
            </header>

            <section id="home-body">
                <div id="home-body-title">
                    <h2>Latest Posts</h2>
                </div>
                
             
                <PostList posts={previewPosts}/>
                
                
                             
                <div>
                    <p><a href="/posts" className="view-all">View All Posts...</a></p>
                </div>
                
            </section>
        </>
    );
};


export default Homepage;