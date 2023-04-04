import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import AvatarUpload from './AvatarUpload';
import {
  Form,
  TextInput,
  CurrencyInput,
  SubmitButton,
  Button,
  updateMutationHandler,
} from '../Forms';

import { defaultCurrency } from '../../currencies';
import UPDATE_PROFILE from '../../graphql/mutations/updateProfile';
import CurrentUserQuery from '../../graphql/queries/currentUser';
import { storeUser } from '../../store/session';

import './EditBasicInfo.css';

const validations = Yup.object().shape({
  name: Yup.string().required('required'),
  currency: Yup.string(),
  homeTownId: Yup.string(),
});

const onSuccess = (onEditFinish) => (formik) => ({
  data: { updateProfile },
}) => {
  updateMutationHandler(updateProfile, formik, () => {
    onEditFinish();
  });
};

const updateStore = (
  store,
  {
    data: {
      updateProfile: { result, successful },
    },
  }
) => {
  if (successful) {
    const data = store.readQuery({ query: CurrentUserQuery });
    const newData = Object.assign({}, data, { currentUser: result });
    storeUser(newData.currentUser);
  }
};

const EditBasicInfo = ({ user, onEditFinish }) => (
  <React.Fragment>
    <AvatarUpload user={user} />
    <div className="UserProfileForm">
      <Form
        mutation={UPDATE_PROFILE}
        initialValues={{
          name: user.name,
          homeTownId: '',
          currency: user.currency || defaultCurrency,
        }}
        validationSchema={validations}
        onSuccess={onSuccess(onEditFinish)}
        updateStore={updateStore}
      >
        {({ translate }) => (
          <React.Fragment>
            <TextInput type="text" name="name" label="Name" />
            <TextInput
              type="text"
              name="homeTownId"
              label="Hometown"
              disabled
            />
            <CurrencyInput name="currency" label="My currency" />
            <div className="form-group">
              <SubmitButton
                label={translate({ text: 'Save' })}
                className="btn btn-outline-primary btn-sm"
              />
              <Button
                label={translate({ text: 'Cancel' })}
                onClick={onEditFinish}
                className="btn btn-outline-secondary btn-sm"
              />
            </div>
          </React.Fragment>
        )}
      </Form>
    </div>
  </React.Fragment>
);

EditBasicInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    currency: PropTypes.string,
  }).isRequired,
  onEditFinish: PropTypes.func.isRequired,
};

export default EditBasicInfo;
