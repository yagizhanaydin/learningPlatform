import * as yup from "yup";

export const Helppassword = yup.object({
  email: yup
    .string()
    .email("Email formatında olmalı")
    .required("Boş geçilemez"),
  password: yup.string().required("Boş geçilemez"),
  passwordagain: yup
    .string()
    .oneOf([yup.ref("password")], "Şifreler eşleşmiyor")
    .required("Boş geçilemez"),
});
