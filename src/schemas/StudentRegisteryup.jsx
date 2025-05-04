import * as yup from "yup";

export const StudentRegisteryup = yup.object({
  email: yup
    .string()
    .email("Provide your e-mail")
    .required("Cannot left blank"),
  name: yup
    .string()
    .required("Cannot left blank"),
  surname: yup
    .string()
    .required("Cannot left blank"),
  password: yup
    .string()
    .required("Cannot left blank")
    .min(6, "Password must be at least 6 characters"),
  passwordagain: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Cannot left blank"),
  role1: yup
    .string()
});
