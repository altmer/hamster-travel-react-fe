import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

import { Form, TextInput, SubmitButton } from '../Forms';

import history from '../../history';
import FORGOT_PASSWORD from '../../graphql/mutations/forgotPassword';

const onSuccess = ({ translate }) => () => {
  toast.success(translate({ text: 'Email sent' }));
  history.push('/');
};

const validations = Yup.object().shape({
  email: Yup.string().email('invalid email').required('required'),
});

const ForgotPassword = () => (
  <Form
    mutation={FORGOT_PASSWORD}
    initialValues={{ email: '' }}
    validationSchema={validations}
    onSuccess={onSuccess}
  >
    {({ translate }) => (
      <div className="container">
        <Helmet>
          <title>{`${translate({
            text: 'Reset password',
          })} | Hamster Travel`}</title>
        </Helmet>
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-8 col-xl-6">
            <TextInput type="email" name="email" label="Email" />
            <div className="form-group">
              <SubmitButton
                label={translate({ text: 'Reset password' })}
                className="btn btn-primary btn-lg btn-block"
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </Form>
);

export default ForgotPassword;
