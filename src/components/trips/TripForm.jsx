import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Translate } from 'react-translated';

import {
  Form,
  TextInput,
  SubmitButton,
  DateRangeSelector,
  Checkbox,
  CurrencyInput,
  TextArea,
  updateMutationHandler,
} from '../Forms';
import TripStatusSelector from './TripStatusSelector';
import { defaultCurrency } from '../../currencies';
import history from '../../history';

import './TripForm.css';

const finished = ({ status }) => status === '2_finished';

const showDates = (formValues) =>
  finished(formValues) || !formValues.datesUnknown;

const schema = Yup.object().shape({
  name: Yup.string().required('required'),
  status: Yup.string().required('required'),
  datesUnknown: Yup.boolean(),
  startDate: Yup.date()
    .nullable()
    .when(['datesUnknown', 'status'], {
      is: (datesUnknown, status) => showDates({ datesUnknown, status }),
      then: Yup.date().required('required'),
    }),
  endDate: Yup.date()
    .nullable()
    .when(['datesUnknown', 'status'], {
      is: (datesUnknown, status) => showDates({ datesUnknown, status }),
      then: Yup.date().required('required'),
    }),

  duration: Yup.number()
    .integer('integer')
    .min(1, 'greater than zero')
    .max(30, 'trip duration invalid')
    .when('datesUnknown', {
      is: true,
      then: Yup.number().required('required'),
    }),
  peopleCountForBudget: Yup.number()
    .required('required')
    .min(1, 'greater than zero'),
  currency: Yup.string().required('required'),
  description: Yup.string(),
});

const fixDuration = (values) => {
  if (values.duration === '') {
    return Object.assign({}, values, { duration: undefined });
  }
  return values;
};

const onSuccess = (formik) => ({ data: { createTrip } }) => {
  updateMutationHandler(createTrip, formik, () => {
    history.push(`/trips/${createTrip.result.id}`);
  });
};

const TripForm = ({ header, mutation }) => (
  <div className="row justify-content-center TripForm">
    <div className="col-md-12 col-lg-8 col-xl-8">
      <h3 className="header">
        <Translate text={header} />
      </h3>
      <Form
        mutation={mutation}
        initialValues={{
          name: '',
          shortDescription: '',
          status: '0_draft',
          datesUnknown: false,
          startDate: null,
          endDate: null,
          duration: 1,
          peopleCountForBudget: 2,
          currency: defaultCurrency,
          private: false,
        }}
        validationSchema={schema}
        onSuccess={onSuccess}
        mapFormValuesToVars={fixDuration}
      >
        {({ translate, values, setFieldValue }) => (
          <React.Fragment>
            <TextInput type="text" name="name" label="TripName" autoFocus />
            <TripStatusSelector
              name="status"
              values={values}
              setFieldValue={setFieldValue}
            />
            {showDates(values) && (
              <DateRangeSelector
                label="Trip dates"
                startName="startDate"
                startPlaceholder={translate({ text: 'Trip first day' })}
                endName="endDate"
                endPlaceholder={translate({ text: 'Trip last day' })}
              />
            )}
            {!showDates(values) && (
              <TextInput
                type="number"
                name="duration"
                label="TripDuration"
                min="1"
              />
            )}
            {!finished(values) && (
              <Checkbox name="datesUnknown" label="TripDatesUnknown" />
            )}
            <TextInput
              type="number"
              name="peopleCountForBudget"
              label="TripPeopleCount"
              min="1"
            />
            <CurrencyInput name="currency" label="TripCurrency" />
            <TextArea
              name="shortDescription"
              label="Trip description"
              rows="3"
            />
            <Checkbox name="private" label="Trip private" />
            <div className="form-group">
              <SubmitButton
                label={translate({ text: 'Save' })}
                className="btn btn-success btn-lg btn-block"
              />
            </div>
          </React.Fragment>
        )}
      </Form>
    </div>
  </div>
);

TripForm.propTypes = {
  mutation: PropTypes.shape({}).isRequired,
  header: PropTypes.string.isRequired,
};

export default TripForm;
