import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//actions:
import { getToken } from "../../redux/auth/authSlice";
import { addSensor, getAllSensors } from "../../redux/sensors/sensorsSlice";

//components:
import Switch from "@material-ui/core/Switch";

//styles:
import "./index.css";

export const CreateModal = ({ show, close }) => {
  const dispatch = useDispatch();

  const token = useSelector(getToken);
  const sensors = useSelector(getAllSensors);

  const [newSensor, setNewSensor] = useState({
    id: "",
    description: "blabla",
    isActive: false,
    samplingPeriod: 5,
  });

  const handleCreate = async () => {
    let ids = [];

    sensors && sensors.forEach((sensor) => ids.push(sensor.id));

    const getUniqueId = () => {
      let newId = parseInt(Math.random() * (10000 - 0 + 1), 10) + 0;

      let alreadyExists = ids.find((id) => id === newId);

      if (alreadyExists) {
        return getUniqueId();
      } else {
        return newId;
      }
    };

    const newSensorWithUniqueId = { ...newSensor, id: getUniqueId() };

    dispatch(addSensor({ token, newSensor: newSensorWithUniqueId }));
    close();
  };

  return (
    <div className={`add_sensor_container p-4 ${show ? "show" : "d-none"}`}>
      <div className={`modal_bg`} onClick={() => close()} />
      <div className="modal_card rounded shadow d-flex flex-column p-5">
        <button className="rounded close" onClick={() => close()}>
          X
        </button>
        <h3 className="text-muted mb-5">Create a new sensor</h3>
        <div className="d-flex flex-column form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control form-control-solid mb-3"
            id="name"
            type="text"
            value={newSensor.description}
            required
            autoFocus
            onChange={(e) => {
              setNewSensor({ ...newSensor, description: e.target.value });
            }}
          />
          <label htmlFor="isActive">isActive</label>
          <Switch
            id="isActive"
            size="small"
            checked={newSensor.isActive}
            onChange={(e) =>
              setNewSensor({ ...newSensor, isActive: e.target.checked })
            }
            color="primary"
          />
          <label htmlFor="samplingPeriod">Sampling Period</label>
          <input
            className="form-control form-control-solid mb-3"
            id="samplingPeriod"
            type="number"
            value={newSensor.samplingPeriod}
            onChange={(e) => {
              setNewSensor({
                ...newSensor,
                samplingPeriod: Number(e.target.value),
              });
            }}
          />

          <button
            className="btn btn-success w-100"
            disabled={!newSensor.description}
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
