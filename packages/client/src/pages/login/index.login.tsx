import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { ValidationEntry } from '../../commonTypes';
import Input from '../../components/InputWithLabel';
import SubmitButton from '../../components/Button';
import Link from '../../components/Link';

const validation: Record<string, ValidationEntry> = {
  login: {
    required: 'Login is required',
    minLength: { value: 3, message: 'at least 3 characters' },
    maxLength: { value: 20, message: 'no more than 20 characters' },
    pattern: {
      value: /^[a-zA-Z0-9-]{3,20}$/,
      message: `Only Latin letters, digits, but not composed solely of them, without spaces, 
      without special characters (hyphens and underscores are allowed)`,
    },
  },
  password: {
    required: 'Password is required',
    minLength: { value: 8, message: 'at least 8 characters' },
    maxLength: { value: 40, message: 'no more than 40 characters' },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
      message: 'At least one uppercase letter and one digit are required',
    },
  },
};

type FormValues = {
  login: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const methods = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <Router>
      <div className="form-container">
        <h2>Login</h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input
              label="Login"
              type="text"
              name="login"
              placeholder="Enter your login"
              autoFocus={true}
              validation={validation.login}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              validation={validation.password}
            />
            <SubmitButton label="Login" />
            <p>
              <span>Don`t have an account yet? </span>
              <Link to="/register"> Register</Link>
            </p>
          </form>
        </FormProvider>
      </div>
    </Router>
  );
};
