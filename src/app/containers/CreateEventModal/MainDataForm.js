import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form } from 'react-bootstrap';
import { Field } from 'formik';
import FormControl from 'app/components/Fields/FormControl';
import DatePickerField from 'app/components/Selects/Date';

const MainDataForm = ({ setFieldValue }) => (
  <div>
    <Form.Row>
      <Form.Group xs={12} as={Col}>
        <Field
          type="text"
          name="eventName"
          component={FormControl}
          placeholder="Введите название мероприятия"
        />
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Form.Group xs={3} as={Col}>
        <DatePickerField
          handleChange={setFieldValue}
          field="dateStart"
          label="Дата"
        />
      </Form.Group>
      <Form.Group xs={3} as={Col}>
        <DatePickerField
          isTime
          isFrom
          handleChange={setFieldValue}
          field="timeStart"
          label="С"
        />
      </Form.Group>
      <Form.Group xs={3} as={Col}>
        <DatePickerField
          isTime
          handleChange={setFieldValue}
          field="timeEnd"
          label="По"
        />
      </Form.Group>
      <Form.Group xs={3} as={Col}>
        <Field
          name="localRoom"
          component={FormControl}
          type="text"
          placeholder="Введите аудиторию"
        />
      </Form.Group>
    </Form.Row>
  </div>
);

MainDataForm.propTypes = {
  setFieldValue: PropTypes.func,
};

export default MainDataForm;
