import React, { useEffect } from 'react';
import { Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { createEventRoutine } from 'app/store/ducks/creating.duck';
import FormikToggle from 'app/components/Toggles/FormikToggle';
import ModalTabs from 'app/containers/CreateEventModal/ModalTabs';
import PropTypes from 'prop-types';
export const FormContext = React.createContext();

const FormComponent = ({
  setFieldValue,
  handleSubmit,
  values,
  isAdmin,
  initialValues,
}) => {
  const { isLocal, isVideo } = values;
  const { VCPartsIDs } = initialValues;
  useEffect(() => {
    if (isVideo) {
      setFieldValue('isVideo', true);
    }
    if (isLocal) {
      setFieldValue('isLocal', true);
      setFieldValue('VCPartsIDs', VCPartsIDs);
    }
  }, [VCPartsIDs, setFieldValue, isLocal, isVideo]);

  return (
    <FormContext.Provider value={{ setFieldValue, values }}>
      <Form onSubmit={handleSubmit} className="p-2">
        <ModalTabs isLocal={isLocal} />
        <Form.Group as={Row} className="justify-content-between">
          <Col xs={{ span: 3, offset: 2 }}>
            {isAdmin && (
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
            )}
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
    </FormContext.Provider>
  );
};

FormComponent.propTypes = {
  setFieldValue: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
  isAdmin: PropTypes.bool,
  initialValues: PropTypes.object,
  resetForm: PropTypes.func,
};

const View = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(store => store.session.profile.isAdmin);
  return (
    <>
      <Formik
        initialValues={{ isVideo: isAdmin, isLocal: !isAdmin, VCPartsIDs: [7] }}
        onSubmit={values => dispatch(createEventRoutine.trigger(values))}
      >
        {props => <FormComponent {...props} isAdmin={isAdmin} />}
      </Formik>
    </>
  );
};

export default View;
