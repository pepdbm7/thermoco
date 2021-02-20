import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../../redux/auth/authSlice";

export const Navbar = () => {
  const { REACT_APP_VERSION } = process.env;
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between">
        <span className="navbar-brand">ThermoCo Admin</span>
        <div className="d-flex ml-auto">
          <NavLink
            to="/home"
            exact
            className="nav-link btn btn-light mx-2"
            activeClassName="active"
          >
            Home
          </NavLink>
          {/* <NavLink
            to="/health"
            className="nav-link btn btn-light mx-2"
            activeClassName="active"
          >
            Health
          </NavLink> */}
          <span
            className="btn bnt-sm btn-danger mx-2"
            onClick={() => dispatch(logout())}
          >
            Log Out
          </span>
        </div>
        <div className={"pull-right text-light text-right"}>
          {REACT_APP_VERSION || ""}
        </div>
      </div>
    </nav>
  );
};
