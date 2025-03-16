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
  video: yup
    .mixed()
    .required("Video dosyası yüklenmelidir.")
    .test("fileSize", "Video boyutu 10MB'den küçük olmalıdır", (value) => {
      return value && value.size <= 100 * 1024 ; 
    })
    .test("fileType", "Geçerli bir video formatı olmalıdır", (value) => {
      return value && ["video/mp4", "video/webm", "video/ogg"].includes(value.type);
    }),
});