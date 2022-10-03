import useGeolocation from "react-hook-geolocation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveLocation } from "../store/location-slice";

const Form = () => {
  const geolocation = useGeolocation();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(saveLocation(token, data, geolocation));
    reset();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div>
        <h2> Do you feel sick?</h2>
        <p>
          Please fill out the form with your data <br /> so you get added to our
          Corona map!
        </p>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            minWidth: "300px",
          }}
        >
          <b style={{ fontSize: "18px", marginBottom: 4 }}>Corona Form</b>
          <textarea
            placeholder="Symptoms, tell us how you feel"
            {...register("symptoms")}
            style={{ height: 70, padding: 10 }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "5px 0px",
            }}
          >
            <div>
              <label>Temperature</label>
              <input
                placeholder="37"
                className="inputTemp"
                {...register("temp", { required: true, min: 35, max: 45 })}
              />
              °C
            </div>
            <input
              type="submit"
              style={{
                color: "white",
                backgroundColor: "black",
              }}
              className="button"
            />
          </div>
          {errors.temp && (
            <span style={{ color: "red", fontSize:"15px" }}>
              Please enter a valid body temperature!
            </span>
          )}
        </form>
      </div>
    </div>
  );
};
export default Form;
