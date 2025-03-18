import * as yup from "yup";

export const newilan = yup.object({
  title: yup
    .string("Title must be a text")
    .required("Title is mandatory"),
  description: yup
    .string("Description must be a text")
    .required("Description is mandatory"),
  price: yup
    .string("Price must be a text")
    .required("Price is mandatory"),
  profession: yup
    .string("Profession must be a text")
    .required("Profession is mandatory"),
  location: yup
    .string("Location must be a text")
    .required("Location is mandatory"),
  lesson: yup
    .string("Lesson must be a text")
    .required("Lesson is mandatory"),
});



export const newvideo = yup.object({
  title: yup
    .string("Title must be a text")
    .required("Title is mandatory"),
  description: yup
    .string("Description must be a text")
    .required("Description is mandatory"),
  price: yup
    .string("Price must be a text")
    .required("Price is mandatory"),
  profession: yup
    .string("Profession must be a text")
    .required("Profession is mandatory"),
  location: yup
    .string("Location must be a text")
    .required("Location is mandatory"),
  lesson: yup
    .string("Lesson must be a text")
    .required("Lesson is mandatory"),
});