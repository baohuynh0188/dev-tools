import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import Layout from "../../layouts/Layout";

const ReleaseTagsPage = (): JSX.Element => {

  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault();
    const content: string = event?.target[0]?.value || "";
    const convertedText = content.trim().replace(/\s-\s|-\s/g, "").replace(/\n|\r/g, " ");
    const result: string = `npm install --save-exact ${convertedText}`;
    try {
      await navigator.clipboard.writeText(result);
      console.log("Copy success");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <Card className="mt-2">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="releasetags"
            >
              <Form.Label>Paste your release tags version</Form.Label>
              <Form.Control as="textarea" rows={15} />
            </Form.Group>
            <Button className="float-end" variant="success" type="submit">Copy to clipboard</Button>
          </Form>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default ReleaseTagsPage;
