import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Translate, Translator } from 'react-translated';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { Formik, Field, Form as FormikForm, useFormikContext } from 'formik';
import { DateRangePicker } from 'react-dates';

import { currenciesList } from '../currencies';

export const Form = ({
  children,
  mutation,
  initialValues,
  validationSchema,
  mapFormValuesToVars,
  updateStore,
  onSuccess,
  onError,
}) => {
  const [mutate] = useMutation(mutation);
  return (
    <Translator>
      {({ translate }) => (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formik) => {
            const formikBag = Object.assign({}, formik, { translate });
            mutate({
              variables: mapFormValuesToVars(values),
              update: updateStore,
            })
              .then(onSuccess(formikBag))
              .catch(onError(formikBag));
          }}
        >
          {(formik) => {
            const formikBag = Object.assign({}, formik, { translate });
            return <FormikForm>{children(formikBag)}</FormikForm>;
          }}
        </Formik>
      )}
    </Translator>
  );
};

Form.propTypes = {
  children: PropTypes.func.isRequired,
  mutation: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  validationSchema: PropTypes.shape({}).isRequired,
  mapFormValuesToVars: PropTypes.func,
  updateStore: PropTypes.func,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func,
};

Form.defaultProps = {
  mapFormValuesToVars: (values) => values,
  updateStore: () => {},
  onError: ({ setSubmitting, translate }) => (err) => {
    toast.error(translate({ text: 'Something went wrong' }));
    setSubmitting(false);
    console.log(err);
  },
};

export const Label = ({ htmlFor, text, className }) => (
  <label htmlFor={htmlFor} className={className}>
    <Translate text={text} />
  </label>
);

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Label.defaultProps = {
  className: '',
};

export const FieldError = ({ name }) => {
  const { errors, touched } = useFormikContext();
  return errors[name] && touched[name] ? (
    <div className="error-message">
      <Translate text={errors[name]} />
    </div>
  ) : null;
};

FieldError.propTypes = {
  name: PropTypes.string.isRequired,
};

export const TextInput = ({
  type,
  name,
  label,
  placeholder,
  className,
  ...props
}) => (
  <div className="form-group">
    <Label htmlFor={name} text={label} />
    <Field
      id={name}
      name={name}
      className={`form-control ${className}`}
      type={type}
      placeholder={placeholder}
      {...props}
    />
    <FieldError name={name} />
  </div>
);

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

TextInput.defaultProps = {
  placeholder: '',
  className: '',
};

export const Checkbox = ({ name, label, className, ...props }) => {
  const { values } = useFormikContext();

  return (
    <div className="form-group form-check">
      <Field
        id={name}
        name={name}
        className={`form-check-input ${className}`}
        type="checkbox"
        checked={values[name]}
        {...props}
      />
      <Label htmlFor={name} text={label} className="form-check-label" />
      <FieldError name={name} />
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  className: '',
};

export const SelectInput = ({ name, label, options, ...props }) => (
  <div className="form-group">
    <Label htmlFor={name} text={label} />
    <Field
      id={name}
      name={name}
      component="select"
      className="form-control"
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </Field>
    <FieldError name={name} />
  </div>
);

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      text: PropTypes.string,
      translate: PropTypes.bool,
    })
  ).isRequired,
};

export const TextArea = ({ name, label, ...props }) => (
  <div className="form-group">
    <Label htmlFor={name} text={label} />
    <Field
      id={name}
      name={name}
      component="textarea"
      className="form-control"
      {...props}
    />
    <FieldError name={name} />
  </div>
);

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export const CurrencyInput = (props) => (
  <SelectInput {...props} options={currenciesList} />
);

export const DateRangeSelector = (props) => {
  const { startName, endName, label, startPlaceholder, endPlaceholder } = props;

  const { values, errors, setFieldValue, setFieldTouched } = useFormikContext();

  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <div className="form-group">
      <Label htmlFor={startName} text={label} />
      <DateRangePicker
        startDate={values[startName]}
        startDateId={startName}
        startDatePlaceholderText={startPlaceholder}
        endDate={values[endName]}
        endDateId={endName}
        endDatePlaceholderText={endPlaceholder}
        block
        hideKeyboardShortcutsPanel
        isOutsideRange={() => false}
        onDatesChange={({ startDate, endDate }) => {
          setFieldValue(startName, startDate);
          setFieldValue(endName, endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={(newFocusedInput) => {
          if (
            focusedInput === 'startDate' &&
            newFocusedInput !== focusedInput
          ) {
            setFieldTouched(startName, true, true);
          }
          if (focusedInput === 'endDate' && newFocusedInput !== focusedInput) {
            setFieldTouched(endName, true, true);
          }
          setFocusedInput(newFocusedInput);
        }}
      />
      <FieldError name={startName} />
      {!errors[startName] && <FieldError name={endName} />}
    </div>
  );
};

DateRangeSelector.propTypes = {
  startName: PropTypes.string.isRequired,
  endName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  startPlaceholder: PropTypes.string.isRequired,
  endPlaceholder: PropTypes.string.isRequired,
};

export const SubmitButton = ({ label, ...props }) => {
  const { isSubmitting } = useFormikContext();
  return (
    <button type="submit" disabled={isSubmitting} {...props}>
      {label}
    </button>
  );
};

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
};

export const Button = ({ label, onClick, ...props }) => {
  const { isSubmitting } = useFormikContext();
  return (
    <button type="button" onClick={onClick} disabled={isSubmitting} {...props}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const graphqlErrorsToForm = (errors, setErrors) => {
  setErrors(
    errors.reduce(
      (errorsObject, error) =>
        Object.assign({}, errorsObject, { [error.field]: error.message }),
      {}
    )
  );
};

export const updateMutationHandler = (
  { successful, messages },
  { setErrors, setSubmitting },
  callback
) => {
  if (successful) {
    callback();
  } else {
    graphqlErrorsToForm(messages, setErrors);
    setSubmitting(false);
  }
};
