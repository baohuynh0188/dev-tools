import React from "react";
import { Button, Card, ListGroup, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Tabs from "../../components/Tabs";
import { bills } from "../../data/bills";
import Layout from "../../layouts/Layout";

const HomePage = (): JSX.Element => {
  const navigate = useNavigate();

  const renderListBills = (): JSX.Element => {
    return (
      <ListGroup>
        {bills.map((item) => {
          const { id, title, totalAmount } = item;
          return (
            <ListGroup.Item
              as="li"
              className="list-group-item list-group-item-action"
              onClick={() => navigate(`/bill/${id}`)}
            >
              <small>Currentlt being settled up:</small>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{title}</h5>
                <h4>{`${totalAmount.toLocaleString("en-US")} VND`}</h4>
              </div>
              <div className="mb-1 w-50">
                <ProgressBar striped variant="danger" now={60} />
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  };

  return (
    <Layout>
      <Tabs>
        <Button className="nav-link active">Your request</Button>
        <Button className="nav-link">Request to you</Button>
      </Tabs>
      <Card className="mt-2">
        <Card.Body>{renderListBills()}</Card.Body>
      </Card>
    </Layout>
  );
};

export default HomePage;
