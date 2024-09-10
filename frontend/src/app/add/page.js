"use client";

import MyTextField from "@/components/MyTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const initialValues = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  userName: Yup.string()
    .required("User Name is required")
    .min(3, "User Name must be at least 3 characters")
    .max(20, "User Name must be at most 20 characters"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one letter and one number"
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Page = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const resolveWithSomeData = new Promise(async (resolve, reject) => {
        await axios
          .post("http://localhost:4000/v1/register", values)
          .then((res) => {
            if (res.data.success) {
              resolve(res.data.message);
            } else {
              reject(res.data.message);
            }
          })
          .catch((err) => {
            if (err) {
              console.log(err);
              return reject(err);
            }
          })
          .finally(() => {
            setSubmitting(false);
          });
      });

      toast.promise(resolveWithSomeData, {
        pending: {
          render() {
            return "Pending...";
          },
        },
        success: {
          render({ data }) {
            return `${data}`;
          },
        },
        error: {
          render({ data }) {
            if (data?.response?.data?.message) {
              return `${data?.response?.data?.message}`;
            }
            if (data?.message) {
              return `${data?.message}`;
            }
          },
        },
      });
    },
  });
  return (
    <div className="h-full flex justify-center items-center bg-slate-200">
      <form
        className="grid grid-cols-1 gap-4 w-11/12 lg:w-1/4 shadow-lg px-5 py-10 bg-white"
        onSubmit={formik.handleSubmit}
      >
        <h3 className="text-xl font-extrabold text-center mb-5">Register</h3>
        <MyTextField formik={formik} name="userName" label="User Name" />
        <MyTextField formik={formik} name="email" label="Email" />
        <MyTextField
          formik={formik}
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <MyTextField
          formik={formik}
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          className=""
          type="submit"
          variant="contained"
          disabled={formik.isSubmitting}
          endIcon={formik.isSubmitting && <CircularProgress size={20} />}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Page;
