import React from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form,
  CardBody,
  Row,
  Col,
  ButtonToolbar,
  Button,
  Container,
} from 'react-bootstrap';
import SelectWithHints from 'app/components/Selects/SelectWithHints';
import DatePickerField from 'app/components/Selects/Date';
import TimePickerField from 'app/components/Selects/Time';
import Minus from 'mdi-react/MinusIcon';
import InputField from 'app/components/Fields/InputField';
import { createEventRoutine } from 'app/store/ducks/creating.duck';

const View = ({ eventsNames, eventNameInput }) => {
  const dispatch = useDispatch();
  const color = '#003274';
  const colored = true;
  const handleChangeFrom = () => false;
  const handleChangeTo = () => false;
  return (
    <>
      <Formik
      // onSubmit={(values, formikActions) =>
      //   login({ values, formikActions, intl })
      // }
      >
        {formikProps => (
          <Form className="p-2">
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Введите название мероприятия"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group xs={4} as={Col}>
                <DatePickerField />
              </Form.Group>
              <Form.Group xs={4} as={Col}>
                <TimePickerField
                  onChange={handleChangeFrom}
                  is12HoursMode={false}
                  name="from"
                />
              </Form.Group>
              <Form.Group xs={4} as={Col}>
                <TimePickerField
                  onChange={handleChangeTo}
                  is12HoursMode={false}
                  name="to"
                />
              </Form.Group>
            </Form.Row>
          </Form>
        )}
      </Formik>
      {/* <FinalForm */}
      {/*  onSubmit={values => dispatch(createEventRoutine.trigger(values))} */}
      {/*  className="form" */}
      {/*  subscription={{ */}
      {/*    submitError: true, */}
      {/*    dirtySinceLastSubmit: true, */}
      {/*  }} */}
      {/*  render={({ handleSubmit, form: { submit } }) => ( */}
      {/*    <> */}
      {/*      <Card> */}
      {/*        <CardBody> */}
      {/*          <form className="form" onSubmit={handleSubmit}> */}
      {/*            <div className="form__form-group"> */}
      {/*              <Field */}
      {/*                name="eventName" */}
      {/*                component={SelectWithHints} */}
      {/*                eventNameInput={eventNameInput} */}
      {/*                initialValue={eventNameInput} */}
      {/*                type="select" */}
      {/*                placeholder="Название конференции" */}
      {/*                options={eventsNames} */}
      {/*              /> */}
      {/*              <Row> */}
      {/*                <Col lg={3} align="center"> */}
      {/*                  <div className="form__form-group-field mt-3"> */}
      {/*                    <Field */}
      {/*                      name="dateStart" */}
      {/*                      type="select" */}
      {/*                      component={DatePickerField} */}
      {/*                    /> */}
      {/*                  </div> */}
      {/*                </Col> */}
      {/*                <Col lg={5}> */}
      {/*                  <div className="d-flex flex-row mt-3"> */}
      {/*                    <Field name="timeStart" component={TimePickerField} /> */}
      {/*                    <Minus */}
      {/*                      style={{ alignSelf: 'center', color: '#cccccc' }} */}
      {/*                    /> */}
      {/*                    <Field name="timeEnd" component={TimePickerField} /> */}
      {/*                  </div> */}
      {/*                </Col> */}
      {/*                <Col lg={4}> */}
      {/*                  <div className="d-flex flex-row mt-3"> */}
      {/*                    <Field */}
      {/*                      name="localRoom" */}
      {/*                      component={InputField} */}
      {/*                      type="text" */}
      {/*                      placeholder="Зал" */}
      {/*                    /> */}
      {/*                  </div> */}
      {/*                </Col> */}
      {/*              </Row> */}
      {/*            </div> */}
      {/*          </form> */}
      {/*        </CardBody> */}
      {/*      </Card> */}
      {/*      <ButtonToolbar */}
      {/*        style={{ paddingRight: '30px' }} */}
      {/*        className="modal__footer " */}
      {/*      > */}
      {/*        <Button outline={colored} color={color} onClick={submit}> */}
      {/*          Отправить */}
      {/*        </Button> */}
      {/*      </ButtonToolbar> */}
      {/*    </> */}
      {/*  )} */}
      {/* /> */}
    </>
  );
};

View.propTypes = {
  eventsNames: PropTypes.array,
  eventNameInput: PropTypes.string,
};

export default View;
