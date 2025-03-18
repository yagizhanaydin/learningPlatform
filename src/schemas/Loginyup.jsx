import * as yup from "yup";

export const Loginyup = yup.object({
  email: yup
    .string() 
    .email("Provide your e-mail")
    .required("Email cannot be left blank"),
  password: yup
    .string()
    .required("Enter your password")
    .min(6, "Password must be at least 6 characters"),
});
