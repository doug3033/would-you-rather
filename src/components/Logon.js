import React, { Component } from 'react';
import logo from '../react.png';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';

class Logon extends Component {
  handleAuthUserSelected = (e, id) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(id))
  }

  getLogonContainer = () => {
    const { users } = this.props
    return(
    <Container>
    <Row className="bottompad">
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
    <Row className="toppad">
      <Col>
        <Dropdown>
          <DropdownToggle variant="success" id="dropdown-basic">
            Sign On
          </DropdownToggle>

          <DropdownMenu>
            {users.map((user) => {
              return (
                <DropdownItem id={user.id} key={user.id} onClick={(e) => this.handleAuthUserSelected(e, user.id)}>
                  <span>
                    <img
                      src={user.avatarURL}
                      alt={`Avatar of ${user.id}`}
                      className='avatar'
                      height="30" width="30"
                    />
                    {` ${user.name}`}
                  </span>
                </DropdownItem>
              )
            })}
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
  </Container>
  )
          }


  render() {
    return (
      <div className="App">
        {this.getLogonContainer()}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users).map((key) => {
      return (users[key])
    })
  }
}

export default connect(mapStateToProps)(Logon)