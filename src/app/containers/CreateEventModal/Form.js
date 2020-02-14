import React, { useEffect } from 'react';
import { Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import FormControl from 'app/components/Fields/FormControl';
import DatePickerField from 'app/components/Selects/Date';
import { createEventRoutine } from 'app/store/ducks/creating.duck';
import FormikToggle from 'app/components/Toggles/FormikToggle';
import PropTypes from 'prop-types';

const FormComponent = ({ setFieldValue, handleSubmit, values, isAdmin }) => {
  const { isLocal, isVideo } = values;
  useEffect(() => {
    if (!isLocal) {
      setFieldValue('isVideo', true);
    }
    if (!isVideo) {
      setFieldValue('isLocal', true);
    }
  }, [isLocal, isVideo, setFieldValue]);
  return (
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
      <Form.Group as={Row} className="justify-content-between">
        <Col xs={3}>
          <Field
            name="isVideo"
            component={props => (
              <FormikToggle
                text="Мероприятие с ВКС"
                id="is_video_toggle"
                disabled={!isLocal}
                {...props}
              />
            )}
          />
        </Col>
        {isAdmin && (
          <Col xs={3}>
            <Field
              name="isLocal"
              component={props => (
                <FormikToggle
                  text="Локальное мероприятие"
                  id="is_local_toggle"
                  disabled={!isVideo}
                  {...props}
                />
              )}
            />
          </Col>
        )}
        <Col className="text-right">
          <Button variant="primary" type="submit">
            Отправить
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

FormComponent.propTypes = {
  setFieldValue: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
  isAdmin: PropTypes.bool,
};

const View = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(store => store.session.profile.isAdmin);
  return (
    <>
      <Formik
        initialValues={{ isVideo: isAdmin, isLocal: !isAdmin }}
        onSubmit={values => dispatch(createEventRoutine.trigger(values))}
      >
        {props => <FormComponent {...props} isAdmin={isAdmin} />}
      </Formik>
    </>
  );
};

export default View;
