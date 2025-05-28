import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
        <div className="container d-flex">
            <div className="ms-auto">
                <Link to="/Input">
                    <button className="btn btn-primary">Add a new Contact</button>
                </Link>
            </div>
        </div>
    </nav>
	);
};