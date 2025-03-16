import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';  
import { StudentRegisteryup } from './schemas/StudentRegisteryup';
import styles from './assets/StudentRegister.module.css'; // CSS modülünü dahil ettik

function Studentregister() {
  const navigate = useNavigate();  
    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            surname: "",
            password: "",
            passwordagain: "",
            role:""
        },

        validationSchema:StudentRegisteryup, 

        onSubmit: async (values) => {  
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/register", values); 
                console.log("Kayıt başarılı:", response.data);
                navigate('/student-panel'); 
            } catch (error) {
                console.error("Kayıt sırasında hata oluştu:", error.response ? error.response.data : error.message);
            }
        }
    });

    return (
        <div className={styles['student-register-page']}>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <h1>Register</h1>

        
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={styles.input}
                />
                {formik.errors.email && formik.touched.email && (
                    <div className={styles.errorMessage}>{formik.errors.email}</div>
                )}

           
                <input 
                    type="text" 
                    name="name"
                    placeholder="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className={styles.input}
                />
                {formik.errors.name && formik.touched.name && (
                    <div className={styles.errorMessage}>{formik.errors.name}</div>
                )}

           
                <input
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    className={styles.input}
                />
                {formik.errors.surname && formik.touched.surname && (
                    <div className={styles.errorMessage}>{formik.errors.surname}</div>
                )}

              
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className={styles.input}
                />
                {formik.errors.password && formik.touched.password && (
                    <div className={styles.errorMessage}>{formik.errors.password}</div>
                )}

           
                <input 
                    type="password"
                    name="passwordagain"
                    placeholder="Confirm Password"
                    value={formik.values.passwordagain}
                    onChange={formik.handleChange}
                    className={styles.input}
                />
                {formik.errors.passwordagain && formik.touched.passwordagain && (
                    <div className={styles.errorMessage}>{formik.errors.passwordagain}</div>
                )}
                <select
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    className={styles.input}
                >
                    <option value="">Select Role</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                </select>
                {formik.errors.role && formik.touched.role && (
                    <div className={styles.errorMessage}>{formik.errors.role}</div>
                )}
                {formik.errors.passwordagain && formik.touched.passwordagain && (
                    <div className={styles.errorMessage}>{formik.errors.passwordagain}</div>
                )}

                <button type="submit" className={styles.button}>Register</button>
            </form>
        </div>
    );
}

export default Studentregister;
