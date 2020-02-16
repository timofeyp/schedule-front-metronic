import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import TableHeader from 'app/components/Tables/RoomsTableHeader';
import TableBody from 'app/components/Tables/RoomsTableBody';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

const Index = props => (
  <Container>
    <Card className="pt-3 pb-3">
      <Row>
        <Col xs={1}>
          <Row>1</Row>
          <Row>2</Row>
          <Row>3</Row>
        </Col>
        <Col xs={11}>
          <PerfectScrollbar style={{ maxWidth: '150%', position: 'relative' }}>
            <div style={{ minWidth: '150%', position: 'relative' }}>
              <TableHeader />
              <TableBody />
            </div>
          </PerfectScrollbar>
        </Col>
      </Row>
    </Card>
  </Container>
);

Index.propTypes = {};

export default Index;
