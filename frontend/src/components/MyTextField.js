const { TextField } = require("@mui/material");

const MyTextField = ({ formik, name, type, label, ...props }) => (
  <TextField
    name={name}
    label={label}
    type={type ? type : "text"}
    value={formik.values[name]}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    fullWidth
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
    {...props}
  />
);

export default MyTextField;
