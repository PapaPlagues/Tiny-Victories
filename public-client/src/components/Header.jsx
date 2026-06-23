import "../styles/Header.css";

function Header() {

    return(
        <header className="site-header">
            <h1 className="logo">Tiny Victories</h1>

            <nav>
                <ul className="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/posts">Posts</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};


export default Header;