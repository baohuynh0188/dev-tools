import React, { Fragment } from 'react'
import { Container, Row } from 'react-bootstrap'
import Navbar from '../components/Navbar'

const Layout = ({ children }: any): JSX.Element => {
  return (
    <Fragment>
    <Navbar />
    <Container>
      <Row>
        <div className="d-flex justify-content-center">
          <div className="w-75 m-3">
            {children}
          </div>
        </div>
      </Row>
    </Container>
  </Fragment>
  )
}

export default Layout