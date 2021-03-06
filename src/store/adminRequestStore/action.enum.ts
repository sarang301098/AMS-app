enum actionTypes {
  GET_ADMIN_REQUEST_PENDING = "GET_ADMIN_REQUEST_PENDING",
  GET_ADMIN_REQUEST_SUCCESS = "GET_ADMIN_REQUEST_SUCCESS",
  GET_ADMIN_REQUEST_FAILED = "GET_ADMIN_REQUEST_FAILED",

  UPDATE_ADMIN_REQUEST_PENDING = "UPDATE_ADMIN_REQUEST_PENDING",
  UPDATE_ADMIN_REQUEST_SUCCESS = "UPDATE_ADMIN_REQUEST_SUCCESS",
  UPDATE_ADMIN_REQUEST_FAILED = "UPDATE_ADMIN_REQUEST_FAILED",

  CHECK_AVAILABLE_BRANDS = "CHECK_AVAILABLE_BRANDS",
  CHECK_AVAILABLE_MODELS = "CHECK_AVAILABLE_MODELS",

  CHECK_AVAILABILITY_SUCCESS = "CHECK_AVAILABILITY_SUCCESS",
  CHECK_AVAILABILITY_FAILED = "CHECK_AVAILABILITY_FAILED",

  RESET = "RESET",
}
export default actionTypes;
