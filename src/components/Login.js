import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import './Login.css'; // Ensure the CSS file is imported

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values) => {
    axios.post('/api/login', values)
      .then(response => {
        const { email } = response.data;
        if (email === 'admin@example.com') { 
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
      <h2 className="login-header">Login</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="login-form">
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
            <button type="submit" className="submit-button">Login</button>
            <button type="button" className="register-button" onClick={() => navigate('/register')}>Register</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
