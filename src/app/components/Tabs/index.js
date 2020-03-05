import React, { useState, useEffect, useCallback } from 'react';
import { Nav, Tab, Row, Col } from 'react-bootstrap';
import { StyledNavLink, StyledNavItem } from 'app/components/Tabs/styles';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const Tabs = ({
  tabs,
  initial,
  onChange,
  errors,
  submitFailed,
  resubmit,
  resetTabsTrigger,
}) => {
  const [activeTab, setTab] = useState(initial || tabs[0].title);
  useEffect(() => {
    // Если находимся не на первой вкладке и сработала валидация после сабмита,
    // то при возврате на первую, поля с ошибкой не будут подсвечены.
    // Здесь делаем сабмит если имеются ошибки и открыт первый таб.
    if (activeTab === tabs[0].title && !isEmpty(errors) && submitFailed) {
      resubmit();
    }
  }, [activeTab, errors, resubmit, submitFailed, tabs]);
  const setActiveFirstTab = useCallback(() => tabs[0].title, [tabs]);
  useEffect(() => {
    if (resetTabsTrigger !== undefined) setActiveFirstTab();
  }, [resetTabsTrigger, setActiveFirstTab]);
  const handleChangeTab = title => {
    if (onChange) {
      onChange(title);
    }
    setTab(title);
  };
  return (
    <Tab.Container
      className="mt-3"
      activeKey={activeTab}
      defaultActiveKey={activeTab}
    >
      <Row>
        <Col sm={2}>
          <Nav variant="pills">
            {tabs.map(({ title, isShown }) => {
              if (isShown) {
                return (
                  <StyledNavItem key={title}>
                    <StyledNavLink
                      active={activeTab === title}
                      onClick={() => handleChangeTab(title)}
                      eventKey={title}
                    >
                      {title}
                    </StyledNavLink>
                  </StyledNavItem>
                );
              }
              return null;
            })}
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content className="mt-2">
            {tabs.map(({ content, title, isShown }) => {
              if (isShown) {
                return (
                  <Tab.Pane eventKey={title} key={title}>
                    {activeTab === title && content}
                  </Tab.Pane>
                );
              }
              return null;
            })}
            {!isEmpty(errors) && submitFailed && (
              <div
                className={`text-danger ${activeTab === tabs[0].title &&
                  'mt-3'}`}
              >
                Не заполнены обязательные поля!
              </div>
            )}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  initial: PropTypes.string,
  onChange: PropTypes.func,
  resubmit: PropTypes.func,
  errors: PropTypes.object,
  submitFailed: PropTypes.bool,
  resetTabsTrigger: PropTypes.any,
};

export default Tabs;
