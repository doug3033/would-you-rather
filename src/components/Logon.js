import React, { Component } from 'react';
import logo from '../logo.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';

class Logon extends Component {



  render() {
    const { usersIds } = this.props
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <h2>Welcome to the Would You Rather App.</h2>
              <h3>Please Sign In to Continue.</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <img src={logo} className="App-logo" alt="logo" />
            </Col>
          </Row>
          <Row>
            <Col>
              <Dropdown>
                <DropdownToggle variant="success" id="dropdown-basic">
                  Sign On
                </DropdownToggle>
              
                <DropdownMenu>
                  {usersIds.map((user) => {
                    return(
                      <DropdownItem key={user} href="#/action-1">{user}</DropdownItem>
                    )  
                  })}
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({users}) {
    return {
        usersIds: Object.keys(users)
    }
}

export default connect(mapStateToProps)(Logon)