import '../styles/Footer.css';

const Footer = () => {
    return(
        <footer className="footer">
            <div className="footer-inner">
                <p>© {new Date().getFullYear()} Tiny Victories</p>

                <div className="footer-links">
                    <a href="/posts">Posts</a>
                    <a href="/about">About</a>
                    <a href="https://github.com/PapaPlagues" target="_blank" rel="noreferrer">
                        Github
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;