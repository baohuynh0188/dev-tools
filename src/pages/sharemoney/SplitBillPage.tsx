import React from "react";
import { Card } from "react-bootstrap";
import Layout from "../../layouts/Layout";

const SplitBillPage = (): JSX.Element => {
  return (
    <Layout>
      <Card className="mt-2">
        <Card.Header as="h5">
          <div className="d-flex w-100 text-center justify-content-between">
            <h5 className="mb-1">dfdsfdsfd</h5>
            <h4>{`31233123 VND`}</h4>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>dadasd</Card.Title>
          {"Sfsdf"}
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default SplitBillPage;
