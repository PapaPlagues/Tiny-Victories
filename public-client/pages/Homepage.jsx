import Card from "../src/components/Card";
import "../styles/Homepage.css";
import heroImage from "../src/assets/pexels-timmossholder-3260289.jpg"




function Homepage({ posts }) {

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
                            <button className="github-btn">Github</button>
                        </div>
                    </div>

                    <img src={heroImage} alt="Hero" className="hero-image"/>
                </div>
            </header>

            <div id="home-body">
                {posts.map((post, i) => (
                    <Card 
                        key={i}
                        title={post.title}
                        excerpt={post.content}
                        link={post.link}
                    />
                ))}

            </div>
        </>
    )
};


export default Homepage;