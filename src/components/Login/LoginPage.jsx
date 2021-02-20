import { useState, memo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

//components:
import { Field, Form, Formik } from "formik";
import { CircularProgress } from "@material-ui/core";

//redux:
import { tryLogin } from "../../redux/auth/authSlice";

//styles:
import "./index.css";

const LoginPage = memo(() => {
  const [usernameInput, setUsernameInput] = useState("test");
  const [passwordInput, setPasswordInput] = useState("1234");
  const [formDisabled, setFormDisabled] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const authStatus = useSelector((state) => state.auth.status);

  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmitTryLogin = async (values, { resetForm }) => {
    setFormDisabled(true);

    let loginParams = {
      username: values.username,
      password: values.password,
    };

    dispatch(tryLogin(loginParams));
  };

  let container;

  if (authStatus.type === "idle" || !token) {
    container = (
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <h2 className="text-center">Account login</h2>
            <Formik
              initialValues={{
                username: usernameInput,
                password: passwordInput,
              }}
              onSubmit={onSubmitTryLogin}
            >
              <Form>
                <div className="form-floating mb-3 d-flex justify-content-center flex-column py-3">
                  <label htmlFor={"username"}>Username</label>
                  <Field
                    type={"text"}
                    id={"username"}
                    name={"username"}
                    className={"form-control"}
                    placeholder={"username"}
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    defaultValue="test"
                    disabled={formDisabled}
                  />
                </div>
                <div className="form-floating mb-3">
                  <label htmlFor={"password"}>Password</label>
                  <Field
                    type={"password"}
                    id={"password"}
                    name={"password"}
                    className={"form-control"}
                    placeholder={"password"}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    defaultValue="1234"
                    disabled={formDisabled}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={formDisabled}
                  >
                    Access
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
          <div className="col-6 text-center">
            <h2>Login with</h2>
            <div className="d-flex justify-content-center align-items-center flex-column py-3">
              <button
                disabled
                className="btn btn-danger d-flex justify-content-between align-items-center mr-2 mb-2"
              >
                <i className="fab fa-google" />
                Google Account
              </button>
              <button
                disabled
                className="btn btn-primary d-flex justify-content-between align-items-center mr-2 mb-2"
              >
                <i className="fab fa-microsoft" />
                Microsoft Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (authStatus.type === "succeeded") {
    container = (
      <div className="card-body success_login_message">
        <h3>
          <code>{usernameInput}</code> has been logged in successfully
        </h3>
        <div
          className={
            "ms-3 mt-2 text-success w-100 py-4 d-flex justify-content-center align-items-center"
          }
        >
          {" "}
          <CircularProgress />
        </div>
      </div>
    );
    if (token) setTimeout(() => history.push("/home"), 1000);
  } else if (authStatus.type === "error") {
    container = <div className="card-body">:({authStatus.error}</div>;
  }

  return (
    <div className="background_login">
      <div className="col-11 col-sm-9 col-md-6 col-lg-6 col-xl-4">
        <div className="card">{container}</div>
      </div>
    </div>
  );
});

export default LoginPage;
