import "../styles/Header.css";

function Header() {

    return(
        <header className="site-header">
            <a href="/" className="logo">
                Tiny <span>Victories</span>
            </a>

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