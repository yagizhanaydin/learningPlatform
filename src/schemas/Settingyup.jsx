import * as yup from "yup"  

export const patchclientyup=yup.object({
    email:yup.string("email string türünde olmalı").email("email türünde olmalı"),
    name:yup.string("name string türünde olmalı"),
    surname:yup.string("surname string türünder olmalı"),
    password:yup.string("string olmalı"),
    passwordagain: yup.string()
        .oneOf([yup.ref("password")], "Şifreler uyuşmuyor")
        .required("Şifre tekrar zorunlu olmalı"),
   })