import { useNavigate } from "react-router";
import "./ErrorPage.css";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            <div className="error-card">
                <h1>Something went wrong</h1>
                <p>
                    The page failed to load or an unexpected error occurred.
                </p>

                <div className="error-actions">
                    <button className="btn" onClick={() => window.location.reload()}>
                        Reload page
                    </button>

                    <button className="btn secondary" onClick={() => navigate("/")}>
                        Go home
                    </button>
                </div>

                <small className="error-code">
                    If this keeps happening, try logging in again.
                </small>
            </div>
        </div>
    );
};

export default ErrorPage;