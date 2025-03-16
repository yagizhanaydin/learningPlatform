import * as yup from "yup";

export const newilan = yup.object({
  title: yup
    .string("Başlık bir metin olmalı")
    .required("Başlık zorunludur"),
  description: yup
    .string("Açıklama bir metin olmalı")
    .required("Açıklama zorunludur"),
  price: yup
    .string("Fiyat bir metin olmalı")
    .required("Fiyat zorunludur"),
  profession: yup
    .string("Branş bir metin olmalı")
    .required("Branş zorunludur"),
  location: yup
    .string("Lokasyon bir metin olmalı")
    .required("Lokasyon zorunludur"),
  lesson: yup
    .string("Ders bir metin olmalı")
    .required("Ders zorunludur"),
});



export const newvideo = yup.object({
  title: yup
    .string("Başlık bir metin olmalı")
    .required("Başlık zorunludur"),
  description: yup
    .string("Açıklama bir metin olmalı")
    .required("Açıklama zorunludur"),
  price: yup
    .string("Fiyat bir metin olmalı")
    .required("Fiyat zorunludur"),
  profession: yup
    .string("Branş bir metin olmalı")
    .required("Branş zorunludur"),
  location: yup
    .string("Lokasyon bir metin olmalı")
    .required("Lokasyon zorunludur"),
  lesson: yup
    .string("Ders bir metin olmalı")
    .required("Ders zorunludur"),
});