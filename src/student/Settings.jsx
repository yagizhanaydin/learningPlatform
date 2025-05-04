import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { patchclientyup } from '../schemas/Settingyup';
import styles from '../assets/Settings.module.css';

function Settings() {

  const patchclientform = useFormik({
    initialValues: {
      email: "",
      name: "",
      surname: "",
      password: "",
      passwordagain: "",
    },
    validationSchema: patchclientyup,
    onSubmit: async () => {
      try {
        const response = await axios.patch("/api/patch");
      } catch (error) {
        console.log("değişim başarısız", error);
      }
    }
  });

  return (
    <form onSubmit={patchclientform.handleSubmit} className={styles.formContainer}>
      <input
        type="email"
        name="email"
        placeholder="email"
        value={patchclientform.values.email}
        onChange={patchclientform.handleChange}
        onBlur={patchclientform.handleBlur}
        className={styles.inputField}
      />
      {patchclientform.touched.email && patchclientform.errors.email && (
        <div className={styles.errorMessage}>{patchclientform.errors.email}</div>
      )}

      <input
        type="text"
        name="name"
        placeholder="name"
        value={patchclientform.values.name}
        onChange={patchclientform.handleChange}
        onBlur={patchclientform.handleBlur}
        className={styles.inputField}
      />
      {patchclientform.touched.name && patchclientform.errors.name && (
        <div className={styles.errorMessage}>{patchclientform.errors.name}</div>
      )}

      <input
        type="text"
        name="surname"
        placeholder="surname"
        value={patchclientform.values.surname}
        onChange={patchclientform.handleChange}
        onBlur={patchclientform.handleBlur}
        className={styles.inputField}
      />
      {patchclientform.touched.surname && patchclientform.errors.surname && (
        <div className={styles.errorMessage}>{patchclientform.errors.surname}</div>
      )}

      <input
        type="password"
        name="password"
        placeholder="password"
        value={patchclientform.values.password}
        onChange={patchclientform.handleChange}
        onBlur={patchclientform.handleBlur}
        className={styles.inputField}
      />
      {patchclientform.touched.password && patchclientform.errors.password && (
        <div className={styles.errorMessage}>{patchclientform.errors.password}</div>
      )}

      <input
        type="password"
        name="passwordagain"
        placeholder="password again"
        value={patchclientform.values.passwordagain}
        onChange={patchclientform.handleChange}
        onBlur={patchclientform.handleBlur}
        className={styles.inputField}
      />
      {patchclientform.touched.passwordagain && patchclientform.errors.passwordagain && (
        <div className={styles.errorMessage}>{patchclientform.errors.passwordagain}</div>
      )}

      <button type="submit" className={styles.submitButton}>Revize et</button>
    </form>
  );
}

export default Settings;
