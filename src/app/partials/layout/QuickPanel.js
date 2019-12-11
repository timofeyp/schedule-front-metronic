/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Nav, Tab } from 'react-bootstrap';
import Filter from 'app/containers/Filter';
import ToggleExtraInfo from 'app/components/Togglers/ToggleExtraInfo';

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false,
};

export default class QuickPanel extends React.Component {
  state = { selectedTab: 'Settings' };

  setTab = _tabName => {
    this.setState({ selectedTab: _tabName });
  };

  render() {
    return (
      <div id="kt_quick_panel" className="kt-quick-panel">
        <a
          href="#"
          className="kt-quick-panel__close"
          id="kt_quick_panel_close_btn"
        >
          <i className="flaticon2-delete" />
        </a>
        <Tab.Container defaultActiveKey={this.state.selectedTab}>
          <div className="kt-quick-panel__nav">
            <Nav
              onSelect={this.setTab}
              className="nav nav-tabs nav-tabs-line nav-tabs-bold nav-tabs-line-3x nav-tabs-line-brand kt-notification-item-padding-x"
            >
              <Nav.Item className="nav-item">
                <Nav.Link eventKey="Settings" className="nav-link show">
                  Настройки
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="kt-quick-panel__content">
            <Tab.Content>
              <Tab.Pane eventKey="Settings">
                <PerfectScrollbar
                  options={perfectScrollbarOptions}
                  style={{
                    maxHeight: 'calc(100vh - 100px)',
                    position: 'relative',
                    display: 'contents',
                  }}
                >
                  <div className="kt-quick-panel__content-padding-x">
                    <Filter />
                    <ToggleExtraInfo />
                  </div>
                </PerfectScrollbar>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
    );
  }
}
