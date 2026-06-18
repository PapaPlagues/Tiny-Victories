import "../../styles/Header.css";

function Header() {

    return(
        <header className="site-header">
            <h1 className="logo">Tiny Victories</h1>

            <nav>
                <ul className="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};


export default Header;