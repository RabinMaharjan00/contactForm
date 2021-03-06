import { Field, Formik } from "formik";
import { object as YupObject, string as YupString } from "yup";
import React, { useEffect, useState } from "react";
import FormikErrorValidation from "../FormikErrorValiation/FormikErrorValidation";
import crypto from 'crypto'
import axios from "axios";
import DataTable from "../../TableComponent/DataTable";

const initialValue = {
  id:"",
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
};
const initialValueValidationSchema = YupObject().shape({
  id:YupString(),
  name: YupString().required("Name is required"),
  email: YupString().required("Email is required"),
  phoneNumber: YupString().required("Phone Numeber is required"),
  address: YupString().required("Address is required"),
});

const ContactForm = () => {
  const [contactData, setContactData] = useState([]);
  const [initialValues, setIntialValue] = useState(initialValue)
  const [active,setActive] = useState("Yes")

  const activeContact = contactData?.data?.map((contacts) => contacts).filter((data) => data?.active === "Yes") 
  const inActiveContact = contactData?.data
    ?.map((contacts) => contacts)
    .filter((data) => data?.active === "No"); 

  const handleSubmit = async(data, resetForm)=> {
    const res = await axios.post("api/contact", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(res.data && res.status === 200) {
      resetForm()
    }
  }

  const getContactInfo = async() => {
    const res = await axios.get("api/contact")
    console.log(res)
    if(res.data && res.status === 200){
      setContactData(res.data)
    }
  }
  const handleDelete = (id) => async() => {
    const res = await axios.delete(`api/contact/${id}`)
   if(res.status === 200) {
     setContactData(res.data)
   }
  }

    const handleUpdate = (id, data) => async () => {
      let value = {
        id: data.id,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        active: active,
      };
      const res = await axios.put(`api/contact/${id}`, value);
      if (res.data && res.status === 200) {
        handleReset()
       getContactInfo()
      }
    };


  const handleEdit = (data) => async() => {
    setActive(data.active)
    setIntialValue({
      id:data.id,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
    });
  }


  const handleReset = () => {
    setActive("Yes")
    setIntialValue(initialValue)
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "S.N",
        Cell: ({ row }) => {
          return (
            <>
              <span>{row.index + 1}</span>
            </>
          );
        },
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "E-mail",
        accessor: "email",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Action",
        Cell: ({ row }) => {
          return (
            <>
              <button
                className="btn btn-outline-secondary text-coolGray600 mr-2"
                type="button"
                title="Edit"
                onClick={ handleEdit(row.original)}
              >
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </button>
              <button
                className="btn btn-outline-danger"
                type="button"
                title="Delete"
                onClick={handleDelete(row.original.id)}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    getContactInfo()
  },[])

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={initialValueValidationSchema}
        onSubmit={(values, { resetForm }) => {
          let data = {
            id: crypto.randomBytes(16).toString("hex"),
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber,
            address: values.address,
            active: active,
          };
          handleSubmit(data, resetForm);
          getContactInfo();
          handleReset();
        }}
      >
        {({ values, handleSubmit, handleChange, errors, touched }) => (
          <>
            <form onSubmit={handleSubmit} id="contact-form">
              <div className="form-group">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control w-50"
                      onChange={handleChange}
                      value={values.name}
                    />
                    <FormikErrorValidation
                      name="name"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      className="form-control w-50"
                      onChange={handleChange}
                      value={values.phoneNumber}
                    />
                    <FormikErrorValidation
                      name="phoneNumber"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">E-mail</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control w-50"
                      onChange={handleChange}
                      value={values.email}
                    />
                    <FormikErrorValidation
                      name="email"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Address</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control w-50"
                      onChange={handleChange}
                      value={values.address}
                    />
                    <FormikErrorValidation
                      name="address"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Active</label>
                    <Field
                      type="radio"
                      id="Active"
                      checked={active === "Yes"}
                      onChange={(e) => {
                        handleChange(e);
                        setActive(e.target.value);
                      }}
                      value="Yes"
                    />
                    <label htmlFor="Active">Yes</label>
                    <Field
                      type="radio"
                      id=""
                      checked={active === "No"}
                      onChange={(e) => {
                        handleChange(e);
                        setActive(e.target.value);
                      }}
                      value="No"
                      className="ml-4"
                    />
                    <label htmlFor="">No</label>
                  </div>
                </div>
                {values.id ? (
                  <button
                    className="btn btn-primary btn-sm mt-2 ml-2 float-right"
                    type="button"
                    onClick={handleUpdate(values.id,values)}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm mt-2 ml-2 float-right"
                    type="submit"
                  >
                    Submit
                  </button>
                )}
                {values.id && (
                  <button
                    className="btn btn-outline-secondary btn-sm mt-2 ml-2 float-right"
                    type="button"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </Formik>
      {activeContact?.length > 0 ? (
        <>
          <h3>Active Contact</h3>
          <DataTable columns={columns} data={activeContact} />
        </>
      ) : (
        ""
      )}
      {inActiveContact?.length > 0 ? (
        <>
          <h3>InActive Contact</h3>
          <DataTable columns={columns} data={inActiveContact} />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ContactForm;
