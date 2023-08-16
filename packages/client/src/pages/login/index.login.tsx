import React, { useState } from 'react';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { BrowserRouter as Router } from 'react-router-dom';

import { ValidationEntry } from '../../commonTypes';
import Input from '../../components/InputWithLabel';
import SubmitButton from '../../components/Button';
import Link from '../../components/Link';
import { LoginAPI } from '../../api/AuthAPI';
import '../../assets/styles/index.scss';
import styles from './styles.module.css';

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

const LoginForm = () => {
  const formMethods = useForm<FormValues>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (loginData) => {
    setError(null);

    try {
      const response = await LoginAPI(loginData);
      console.log('====response==>', response);
      const { status } = response;
      switch (status) {
        case 200:
          setError('Login successful');
          formMethods.reset();
          break;
        case 400:
          setError('User already in the system');
          break;
        case 401:
          setError('Login failed. Please check your credentials');
          break;
        case 500:
          setError('An error occurred while logging in');
          break;
        default:
          setError(`${status}`);
      }
    } catch (error) {
      setError(`An error occurred while logging in. ${error}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.formContainer}>
          <h2>Login</h2>
          {error && <p>{error}</p>}
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
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
                <span>Don&apos;t have an account yet? </span>
                <Link to="/register"> Register</Link>
              </p>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;

// export const LoginForm: React.FC = () => {
//   const formMethods = useForm<FormValues>();
//   const [error, setError] = useState<string | null>(null);

//   const onSubmit: SubmitHandler<FormValues> = async (loginData) => {
//     setError(null);

//     try {
//       const response = await LoginAPI(loginData);
//       console.log('====response==>', response);
//       const { status } = response;
//       switch (status) {
//         case 200:
//           setError('Login successful');
//           formMethods.reset();
//           break;
//         case 400:
//           setError('User already in the system');
//           break;
//         case 401:
//           setError('Login failed. Please check your credentials');
//           break;
//         case 500:
//           setError('An error occurred while logging in');
//           break;
//         default:
//           setError(`${status}`);
//       }
//     } catch (error) {
//       setError(`An error occurred while logging in. ${error}`);
//     }
//   };

//   return (
//     <Router>
//       <div className={styles.container}>
//         <div className={styles.contentContainer}>
//           <div className={styles.formContainer}>
//             <h2>Login</h2>
//             {error && <p>{error}</p>}
//             <FormProvider {...formMethods}>
//               <form onSubmit={formMethods.handleSubmit(onSubmit)}>
//                 <Input
//                   label="Login"
//                   type="text"
//                   name="login"
//                   placeholder="Enter your login"
//                   autoFocus={true}
//                   validation={validation.login}
//                 />
//                 <Input
//                   label="Password"
//                   type="password"
//                   name="password"
//                   placeholder="Enter your password"
//                   validation={validation.password}
//                 />
//                 <SubmitButton label="Login" />
//                 <p>
//                   <span>Don&apos;t have an account yet? </span>
//                   <Link to="/register"> Register</Link>
//                 </p>
//               </form>
//             </FormProvider>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// };
