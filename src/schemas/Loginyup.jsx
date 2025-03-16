import * as yup from "yup";

export const Loginyup = yup.object({
  email: yup
    .string() 
    .email("Email türünde olmalı")
    .required("Email boş geçilemez"),
  password: yup
    .string()
    .required("Şifre boş geçilemez")
    .min(6, "Şifre en az 6 karakter olmalı"),
});
