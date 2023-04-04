import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

import { Form, TextInput, SubmitButton, updateMutationHandler } from '../Forms';

import history from '../../history';
import UPDATE_PASSWORD from '../../graphql/mutations/updatePassword';

const formValues = {
  oldPassword: '',
  password: '',
  passwordConfirmation: '',
};

const validations = Yup.object().shape({
  oldPassword: Yup.string().required('required'),
  password: Yup.string().required('required').min(5, 'password too short'),
  passwordConfirmation: Yup.string().required('required'),
});

const onSuccess = (formik) => ({ data: { updatePassword } }) => {
  const { translate, setSubmitting } = formik;
  updateMutationHandler(updatePassword, formik, () => {
    toast.success(translate({ text: 'Password changed' }));
    setSubmitting(false);
    history.push('/');
  });
};

const ChangePassword = () => (
  <Form
    mutation={UPDATE_PASSWORD}
    initialValues={formValues}
    validationSchema={validations}
    onSuccess={onSuccess}
  >
    {({ translate }) => (
      <div className="container">
        <Helmet>
          <title>{`${translate({
            text: 'Change password',
          })} | Hamster Travel`}</title>
        </Helmet>
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-8 col-xl-6">
            <TextInput
              type="password"
              name="oldPassword"
              label="Current password"
            />
            <TextInput type="password" name="password" label="Password" />
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

export default ChangePassword;
