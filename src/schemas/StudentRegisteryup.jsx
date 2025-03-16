import * as yup from "yup";

export const StudentRegisteryup = yup.object({
  email: yup
    .string()
    .email("Email türünde olmalı")
    .required("Email boş geçilemez"),
  name: yup
    .string()
    .required("İsim boş geçilemez"),
  surname: yup
    .string()
    .required("Soyisim boş geçilemez"),
  password: yup
    .string()
    .required("Şifre boş geçilemez")
    .min(6, "Şifre en az 6 karakter olmalı"),
  passwordagain: yup
    .string()
    .oneOf([yup.ref("password")], "Şifreler eşleşmiyor")
    .required("Şifre tekrar boş geçilemez"),
  className: yup
    .string()
    .required("Sınıf boş geçilemez")
});
