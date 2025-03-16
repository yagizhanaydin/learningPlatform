import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Helppassword } from "./schemas/Helpyup";

function Help() {
  const helpform = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordagain: "",
    },
    validationSchema: Helppassword,
    onSubmit: async (values) => {
      try {
        const response = await axios.patch("/api/help", values);
        console.log("Başarılı:", response.data);
      } catch (error) {
        alert("Hata oluştu");
      }
    },
  });

  return (
    <form onSubmit={helpform.handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={helpform.values.email}
        onChange={helpform.handleChange}
        onBlur={helpform.handleBlur} // Touched için
      />
      {helpform.touched.email && helpform.errors.email && (
        <div>{helpform.errors.email}</div>
      )}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={helpform.values.password}
        onChange={helpform.handleChange}
        onBlur={helpform.handleBlur}
      />
      {helpform.touched.password && helpform.errors.password && (
        <div>{helpform.errors.password}</div>
      )}

      <input
        type="password"
        name="passwordagain"
        placeholder="Password Again"
        value={helpform.values.passwordagain}
        onChange={helpform.handleChange}
        onBlur={helpform.handleBlur}
      />
      {helpform.touched.passwordagain && helpform.errors.passwordagain && (
        <div>{helpform.errors.passwordagain}</div>
      )}

      <button type="submit">Gönder</button>
    </form>
  );
}

export default Help;
