import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/user-slice";

export const ProfileComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const { token } = useSelector((state) => state.auth);
  const { name } = useSelector((state) => state.user);

  const onSubmit = async (data) =>
    dispatch(updateUser(token, data, user));

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{name||user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "5px 0px",
            }}
          >
            <div>
              <input
                placeholder="Update your name"
                {...register("name", { required: true })}
              />
            </div>
            <input
              type="submit"
              value="update name"
              style={{
                color: "white",
                backgroundColor: "black",
                marginLeft: 5,
              }}
              className="button"
            />
          </div>
          {errors.temp && (
            <span style={{ color: "red" }}>Please enter a new name</span>
          )}
        </form>
      </Row>
      <Row></Row>
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
