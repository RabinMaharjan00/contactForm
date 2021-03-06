import React from 'react'

const FormikErrorValidation = (props) => {
    const {name, touched, errors} = props
    return touched[name] && !!errors[name] ? (
      <span className="error text-danger" style={{ fontStyle: "normal" }}>
        {" "}
        <span className="fa fa-exclamation-circle"></span>{" "}
        {errors[name] ? (errors[name]) : ""}
      </span>
    ) : (
      <></>
    );
}

export default FormikErrorValidation
