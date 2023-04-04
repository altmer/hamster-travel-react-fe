import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

import { Form, TextInput, SubmitButton, updateMutationHandler } from '../Forms';

import history from '../../history';
import REGISTER from '../../graphql/mutations/register';

const validations = Yup.object().shape({
  name: Yup.string().required('required'),
  email: Yup.string().email('invalid email').required('required'),
  password: Yup.string().required('required').min(5, 'password too short'),
  passwordConfirmation: Yup.string().required('required'),
});

const onSuccess = (formik) => ({ data: { register } }) => {
  const { translate } = formik;
  updateMutationHandler(register, formik, () => {
    toast.success(translate({ text: 'Registration successful' }));
    history.push('/login');
  });
};

const Registration = () => (
  <Form
    mutation={REGISTER}
    initialValues={{
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    }}
    validationSchema={validations}
    onSuccess={onSuccess}
  >
    {({ translate }) => (
      <div className="container">
        <Helmet>
          <title>{`${translate({
            text: 'Register',
          })} | Hamster Travel`}</title>
        </Helmet>
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-8 col-xl-6">
            <TextInput type="text" name="name" label="Name" />
            <TextInput type="email" name="email" label="Email" />
            <TextInput type="password" name="password" label="Password" />
            <TextInput
              type="password"
              name="passwordConfirmation"
              label="Password confirmation"
            />
            <div className="form-group">
              <SubmitButton
                label={translate({ text: 'Sign up' })}
                className="btn btn-outline-success btn-lg btn-block"
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </Form>
);

export default Registration;
