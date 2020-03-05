import React, { useContext } from 'react';
import { Col, Form } from 'react-bootstrap';
import { Field } from 'formik';
import FormControl from 'app/components/Fields/FormControl';
import DatePickerField from 'app/components/Selects/Date';
import { FormContext } from 'app/containers/CreateEventModal/Form';

const MainInfo = () => {
  const { setFieldValue } = useContext(FormContext);
  return (
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
            setFieldValue={setFieldValue}
            field="dateStart"
            label="Дата"
          />
        </Form.Group>
        <Form.Group xs={3} as={Col}>
          <DatePickerField
            isTime
            isFrom
            setFieldValue={setFieldValue}
            field="dateTimeStart"
            label="С"
          />
        </Form.Group>
        <Form.Group xs={3} as={Col}>
          <DatePickerField
            isTime
            setFieldValue={setFieldValue}
            field="dateTimeEnd"
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
};

export default MainInfo;
