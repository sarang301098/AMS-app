import { useDispatch } from "react-redux";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import { addBrandAction } from "../../../store/brandStore/brand.action.async";
import { addModelAction } from "../../../store/modelStore/model.action.async";
import { addInventoryNameActionThunk } from "../../../store/purchases/purchase.actions.async";
import ModalAdd from "../../Modals/ModalAdd";

const AddNewBrandAndModel = (props: any) => {
  const dispatch = useDispatch();

  const addBrandSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
  });

  const formikBrand = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: addBrandSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addBrandAction(values.name));
      props.setShowAddBrand(false);
      resetForm();
    },
  });

  const formikInventoryName = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: addBrandSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addInventoryNameActionThunk({ name: values.name }));
      props.setShowAddInventoryName(false);
      resetForm();
    },
  });

  const formikModal = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      brandId:
        props.brandOptions.length > 0
          ? props.brandOptions[0]
          : { label: "", value: "" },
    },
    validationSchema: addBrandSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        addModelAction(
          values.name,
          values.brandId.value,
          props.formik.values.BrandId
        )
      );
      props.setShowAddModal(false);
      resetForm();
    },
  });

  return (
    <>
      <ModalAdd
        show={props.showAddInventoryName}
        hideModal={() => props.setShowAddInventoryName(false)}
        title="Inventory Name"
      >
        <ToastContainer />
        <form
          className="form-horizontal"
          onSubmit={formikInventoryName.handleSubmit}
        >
          <div className="card-body">
            <div className="d-flex">
              <div className="row flex">
                <div className="col-xl-8">
                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">Inventory Name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          onChange={formikInventoryName.handleChange}
                          onBlur={formikInventoryName.handleBlur}
                          value={formikInventoryName.values.name}
                        />
                      </div>
                      {formikInventoryName.errors.name &&
                      formikInventoryName.touched.name ? (
                        <div className="text-danger">
                          {formikInventoryName.errors.name}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-right">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </ModalAdd>
      <ModalAdd
        show={props.showAddBrand}
        hideModal={() => props.setShowAddBrand(false)}
        title="Brand"
      >
        <ToastContainer />
        <form className="form-horizontal" onSubmit={formikBrand.handleSubmit}>
          <div className="card-body">
            <div className="d-flex">
              <div className="row flex">
                <div className="col-xl-8">
                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">Brand Name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          onChange={formikBrand.handleChange}
                          onBlur={formikBrand.handleBlur}
                          value={formikBrand.values.name}
                        />
                      </div>
                      {formikBrand.errors.name && formikBrand.touched.name ? (
                        <div className="text-danger">
                          {formikBrand.errors.name}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-right">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </ModalAdd>
      <ModalAdd
        show={props.showAddModal}
        hideModal={() => props.setShowAddModal(false)}
        title="Models"
      >
        <ToastContainer />
        <form className="form-horizontal" onSubmit={formikModal.handleSubmit}>
          <div className="card-body">
            <div className="d-flex">
              <div className="row flex">
                <div className="col-xl-8">
                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">Brands</label>
                        <Select
                          defaultValue={
                            props.brandOptions && props.brandOptions[0]
                          }
                          placeholder="Brands"
                          classNamePrefix={"test"}
                          styles={{
                            menu: (styles) => ({
                              ...styles,
                              ZIndex: 999,
                            }),
                          }}
                          options={props.brandOptions}
                          name="brandId"
                          value={formikModal.values.brandId}
                          onChange={(e) =>
                            formikModal.setValues({
                              ...formikModal.values,
                              brandId: e!,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">Model Name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          onChange={formikModal.handleChange}
                          onBlur={formikModal.handleBlur}
                          value={formikModal.values.name}
                        />
                      </div>
                      {formikModal.errors.name && formikModal.touched.name ? (
                        <div className="text-danger">
                          {formikModal.errors.name}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-right">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </ModalAdd>
    </>
  );
};

export default AddNewBrandAndModel;
