import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    studentId: '',
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    studentId: Yup.string().required('Student ID is required'),
    name: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
  });

  const onSubmit = (values) => {
    axios.post('/api/register', values)
      .then(response => {
        // Redirect to login page after registration
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div>
            <label>Student ID</label>
            <Field name="studentId" />
            <ErrorMessage name="studentId" component="div" />
          </div>
          <div>
            <label>Full Name</label>
            <Field name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
