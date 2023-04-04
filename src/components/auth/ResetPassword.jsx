import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

import { Form, TextInput, SubmitButton, updateMutationHandler } from '../Forms';

import history from '../../history';
import RESET_PASSWORD from '../../graphql/mutations/resetPassword';

const mapFormValuesToVars = (token) => (values) =>
  Object.assign(values, { token });

const onSuccess = (formik) => ({ data: { resetPassword } }) => {
  const { translate } = formik;
  updateMutationHandler(resetPassword, formik, () => {
    toast.success(translate({ text: 'Password changed' }));
    history.push('/login');
  });
};

const onError = ({ translate }) => () => {
  history.push('/forgot_password');
  toast.error(translate({ text: 'Token expired' }));
};

const validations = Yup.object().shape({
  password: Yup.string().required('required').min(5, 'password too short'),
  passwordConfirmation: Yup.string().required('required'),
});

const ResetPassword = ({
  match: {
    params: { token },
  },
}) => (
  <Form
    mutation={RESET_PASSWORD}
    initialValues={{
      password: '',
      passwordConfirmation: '',
    }}
    validationSchema={validations}
    onSuccess={onSuccess}
    onError={onError}
    mapFormValuesToVars={mapFormValuesToVars(token)}
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
            <TextInput type="password" name="password" label="New password" />
            <TextInput
              type="password"
              name="passwordConfirmation"
              label="Password confirmation"
            />
            <div className="form-group">
              <SubmitButton
                label={translate({ text: 'Change password' })}
                className="btn btn-primary btn-lg btn-block"
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </Form>
);

ResetPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ResetPassword;
