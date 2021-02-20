import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const { REACT_APP_VERSION } = process.env;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className={"container"}>
        <a className="navbar-brand" href="#">
          ThermoCo Admin
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <nav className="nav navbar-nav nav-fill">
            <NavLink
              to="/"
              exact
              className="nav-link"
              activeClassName={"active"}
            >
              Home
            </NavLink>
            <NavLink
              to="/health"
              className="nav-link"
              activeClassName={"active"}
            >
              Health
            </NavLink>
          </nav>
        </div>
        <div className={"pull-right text-light text-right"}>
          {REACT_APP_VERSION || ""}
        </div>
      </div>
    </nav>
  );
};
