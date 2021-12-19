import Loader from "react-loader-spinner";

const center: object = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};

export const Spinner = (
  <div style={center}>
    <Loader type="BallTriangle" color="#2b343e" height={80} width={80} />
  </div>
);

export const Loading = (props: any) =>
  props.loading ? Spinner : <div>{props.children}</div>;
