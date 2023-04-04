import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-translated';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

import { Form, TextInput, SubmitButton } from '../Forms';

import { storeLogin } from '../../store/session';
import history from '../../history';
import LOGIN from '../../graphql/mutations/login';

const validations = Yup.object().shape({
  email: Yup.string().email('invalid email').required('required'),
  password: Yup.string().required('required'),
});

const onSuccess = ({ translate }) => ({ data: { login } }) => {
  storeLogin(login);

  setTimeout(() => {
    history.push('/');
    toast.success(translate({ text: 'Login successful' }));
  }, 10);
};

const onError = ({ setSubmitting, setErrors }) => ({
  graphQLErrors: [error],
}) => {
  setErrors({ email: error.message });
  setSubmitting(false);
};

const Login = () => (
  <Form
    mutation={LOGIN}
    initialValues={{ email: '', password: '' }}
    validationSchema={validations}
    onSuccess={onSuccess}
    onError={onError}
  >
    {({ translate }) => (
      <div className="container">
        <Helmet>
          <title>{`${translate({
            text: 'Login',
          })} | Hamster Travel`}</title>
        </Helmet>
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-8 col-xl-6">
            <TextInput type="email" name="email" label="Email" />
            <TextInput type="password" name="password" label="Password" />
            <p>
              <Link to="/forgot_password">
                <Translate text="Forgot your password?" />
              </Link>
            </p>
            <div className="form-group">
              <SubmitButton
                label={translate({ text: 'Sign in' })}
                className="btn btn-outline-success btn-lg btn-block"
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </Form>
);

export default Login;
