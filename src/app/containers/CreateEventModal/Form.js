import React from 'react';
import { Formik, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import FormControl from 'app/components/Fields/FormControl';
import DatePickerField from 'app/components/Selects/Date';
import { createEventRoutine } from 'app/store/ducks/creating.duck';

const View = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Formik onSubmit={values => dispatch(createEventRoutine.trigger(values))}>
        {({ setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="p-2">
            <Form.Row>
              <Form.Group xs={12} as={Col}>
                <Field
                  type="text"
                  name="eventName"
                  component={FormControl}
                  placeholder="Введите название мероприятия"
                />
              </Form.Group>
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
            <Form.Group as={Row}>
              <Col className="text-right">
                <Button variant="primary" type="submit">
                  Отправить
                </Button>
              </Col>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default View;
