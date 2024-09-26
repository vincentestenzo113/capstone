import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    studentId: '',
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    studentId: Yup.string()
      .matches(/^[0-9]{10}$/, 'Student ID must be exactly 10 digits')
      .required('Student ID is required'),
    name: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
  });

  const onSubmit = (values) => {
    axios.post('/api/register', values)
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="register-form">
          <div className="form-group">
            <label className="form-label">Student ID</label>
            <Field 
              name="studentId" 
              className="form-input" 
              type="text" 
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') {
                  event.preventDefault();
                }
              }} 
            />
            <ErrorMessage name="studentId" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <Field name="name" className="form-input" />
            <ErrorMessage name="name" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <Field type="email" name="email" className="form-input" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <Field type="password" name="password" className="form-input" />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">Register</button>
            <button type="button" className="register-button" onClick={() => navigate('/')}>Back to Login</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
