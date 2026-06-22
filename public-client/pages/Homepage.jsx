import Card from "../src/components/Card";
import "../styles/Homepage.css";
import heroImage from "../src/assets/pexels-timmossholder-3260289.jpg"
import { useOutletContext } from "react-router";

const Homepage = () => {

    const { backendData = [] } = useOutletContext();

    return (
        <>
            <header className="hero">
                <div className="hero-inner">
                      <div className="hero-text">
                        <h1>Welcome to <span className="brand">Tiny Victories</span>

                        </h1>

                        <p>
                            Hello! I'm Jacob. I like building things - websites, small games, drawings, and stories.
                            Right now I'm learning web development and UX design, and this blog is where I keep everything I'm working on and figuring out.
                            It's a mix of code, art, ideas, and various other projects.
                        </p>
                        <div>
                            <a href="https://github.com/PapaPlagues">
                                <button className="github-btn">Github</button>
                            </a>
                        </div>
                    </div>

                    <img src={heroImage} alt="Hero" className="hero-image"/>
                </div>
            </header>

            {/* Eventually filter this to show a few and a 'see more posts' */}
            <div id="home-body">
                <div>
                      {backendData.map((post, i) => (
                        <Card 
                            key={i}
                            title={post.title}
                            excerpt={post.content}
                            link={`/posts/${post.id}`}
                        />
                    ))}
                </div>
              

                <div>
                    <p><a href="/posts">View All Posts...</a></p>
                </div>
                
            </div>
        </>
    )
};


export default Homepage;