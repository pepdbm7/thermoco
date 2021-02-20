import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//redux:
import {
  fetchSensors,
  getAllSensors,
  clearPage,
} from "../../redux/sensors/sensorsSlice";
import { getToken } from "../../redux/auth/authSlice";

//components:
import { CircularProgress } from "@material-ui/core";
import { Navbar } from "../layout";

//styles:
import "./index.css";

const Homepage = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  const sensors = useSelector(getAllSensors);
  const loading = useSelector((state) => state.sensors.loading);
  const error = useSelector((state) => state.sensors.error);

  useEffect(() => {
    dispatch(fetchSensors(token));

    return () => dispatch(clearPage());
  }, []);

  return (
    <>
      <Navbar />
      <div className="container p-4">
        <div className="card card-custom gutter-b shadow col-12">
          <div className="card-header bg-white flex-wrap pt-6 pb-0 border-bottom border-gray">
            <div className="card-title text-muted font-weight-bold">
              SENSORS
            </div>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <CircularProgress />
              </div>
            ) : error ? (
              <b className="w-100 h-100 d-flex justify-content-center align-items-center text-muted">
                {error}
              </b>
            ) : (
              <>
                {Array.isArray(sensors) &&
                  sensors.length > 0 &&
                  sensors.map((sensor) => (
                    <div
                      key={sensor.id}
                      className="alert alert-light w-100 d-flex flex-column"
                    >
                      <h5>{sensor.description}</h5>
                      <span>Active: {sensor.isActive ? "Yes" : "No"}</span>
                      <span>Sampling Period: {sensor.samplingPeriod}</span>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
