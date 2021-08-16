import React, { Component, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
const axios = require('axios');

function CreateSubModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        + Track New Subreddit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Track a new Subreddit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Subreddit Name</Form.Label>
              <Form.Control type="input" placeholder="Enter Subreddit" />
              <Form.Text className="text-muted">
                Subreddit Name i.e. Wallstreetbets
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Subreddit Link</Form.Label>
              <Form.Control type="input" placeholder="Enter Subreddit url"/>
              <Form.Text className="text-muted">
                Subreddit Link i.e. https://www.reddit.com/r/Superstonk/
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Subreddit Description</Form.Label>
              <Form.Control type="input" placeholder="Enter A Description"/>
              <Form.Text className="text-muted">
                Subreddit Description
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Track
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default class Subreddit_List extends Component {
state = {
    isLoading: true,
    subreddits: [],
    error: null
}
constructor(props) {
    super(props);
}
fetchEmp() {
    fetch(`http://localhost:8000/Subreddits/`)
        .then(response => response.json())
        .then(data =>
           this.setState({
               subreddits: data,
               isLoading: false,
           })
        )
       .catch(error => this.setState({ error, isLoading: false }));
}
componentDidMount() {
    this.fetchEmp();
}
render() {
    return (
        <Container style={{ marginTop: '100px' }}>
        <CreateSubModal />
        <CardDeck>
        {!this.state.isLoading?this.state.subreddits.map((subreddit)=>{
        return (
        <Card>
            <Card.Body>
              <Card.Title>{subreddit.Subreddit_Name}</Card.Title>
              <Card.Text>
                {subreddit.Subreddit_Description}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
            <a href={subreddit.Subreddit_Link}>
              <Button variant="primary">Visit Subreddit</Button>{''}
            </a>
            <Link to={{ pathname: '/Metrics', state: {sub_url: subreddit.Subreddit_Link }}
            }>
            <Button renderAs="button">
              <span>Metrics</span>
            </Button>
          </Link>
              <small className="text-muted">Tracking Since: {subreddit.Created_date}</small>
            </Card.Footer>
          </Card>
        )
        })
        :
            "LOADING"
        }
    </CardDeck>
     </Container>
    )
  }
}