import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
const axios = require('axios');

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
        <CardDeck>
        {!this.state.isLoading?this.state.subreddits.map((subreddit)=>{
        return (
        <Card key={subreddit.Created_date}>
            <Card.Body>
              <Card.Title>{subreddit.Subreddit_Name}</Card.Title>
              <a href={subreddit.Subreddit_Link}>
              <Button variant="secondary">Visit Subreddit</Button>{''}
            </a>
            <Link to={{ pathname: '/Metrics', state: {sub_url: subreddit.Subreddit_Link }}
            }>
            <Button>
              <span>Metrics</span>
            </Button>
          </Link>
              <Card.Text>
                {subreddit.Subreddit_Description}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
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