import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const { REACT_APP_VERSION } = process.env;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between">
        <span className="navbar-brand">ThermoCo Admin</span>
        <div className="d-flex ml-auto">
          <NavLink
            to="/home"
            exact
            className="nav-link"
            activeClassName="active"
          >
            Home
          </NavLink>
          <NavLink to="/health" className="nav-link" activeClassName="active">
            Health
          </NavLink>
        </div>
        <div className={"pull-right text-light text-right"}>
          {REACT_APP_VERSION || ""}
        </div>
      </div>
    </nav>
  );
};
