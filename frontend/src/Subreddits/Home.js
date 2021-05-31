import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
    AreaChart,
    Area,
  } from 'recharts';

export default class Home extends Component {
    url = 'http://localhost:8000/subreddit_activity/?subreddit=https://www.reddit.com/r/Superstonk/'
    thirty_minutes_url = this.url + '&timespan=30'
    sixty_minutes_url = this.url + '&timespan=60'
    four_hour_url = this.url + '&timespan=240'
    twenty_four_hour_url = this.url + '&timespan=1440'
    state = {
        isLoading: true,
        metric: [],
        error: null,
    }

    constructor(props) {
        super(props);
    }

fetch_metrics(url) {
    fetch(url)
        .then(response => response.json())
        .then(data =>
           this.setState({
               metric: data,
               isLoading: false,
           })
        )
       .catch(error => this.setState({ error, isLoading: false }));
       
}

componentDidMount() {
    this.fetch_metrics(this.url);

}
thirty_minute_chart = (ev) =>{
    ev.preventDefault()
    this.fetch_metrics(this.thirty_minutes_url)
}

sixty_minute_chart = (ev) =>{
    ev.preventDefault()
    this.fetch_metrics(this.sixty_minutes_url)
}
four_hour_chart = (ev) =>{
    ev.preventDefault()
    this.fetch_metrics(this.four_hour_url)
}
twenty_four_hour_chart = (ev) =>{
    ev.preventDefault()
    this.fetch_metrics(this.twenty_four_hour_url)
}
all_time_chart = (ev) =>{
    ev.preventDefault()
    this.fetch_metrics(this.url)
}

render() {
    return (
        <div style={{ width: '100%' }}>
        <Container style={{ marginTop: '100px' }}>
        <h4>Superstonk Metrics</h4>
        <LineChart
          width={1000}
          height={200}
          data={this.state.metric}
          syncId="anyId"
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Created_date" />
          <YAxis domain={['dataMin', 'dataMax']}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Online_members" stroke="#8884d8" />
        </LineChart>
        </Container>

        <Container width="80%" height={200}>
        <LineChart
          width={1000}
          height={200}
          data={this.state.metric}
          syncId="anyId"
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Created_date" />
          <YAxis domain={['dataMin', 'dataMax']}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Total_members" stroke="#82ca9d" />
          <Brush />
        </LineChart>
        </Container>


        <Container width="80%" height={200}>
        <LineChart
          width={1000}
          height={200}
          data={this.state.metric}
          syncId="anyId"
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Created_date" />
          <YAxis domain={['dataMin', 'dataMax']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Price" stroke="#26dc2c" />
        </LineChart>
        <React.Fragment>
            <Button onClick={this.thirty_minute_chart} className='nextBtn' 
            variant="primary">30m</Button>{' '}
            <Button onClick={this.sixty_minute_chart} className='nextBtn' 
            variant="primary">1hr</Button>{' '}
            <Button onClick={this.four_hour_chart} className='nextBtn' 
            variant="primary">4hr</Button>{' '}
            <Button onClick={this.twenty_four_hour_chart} className='nextBtn' 
            variant="primary">24hr</Button>{' '}
            <Button onClick={this.all_time_chart} className='nextBtn' 
            variant="primary">All</Button>{' '}
        </React.Fragment>
        </Container>
    <Container width="80%" height={100}>
       <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date Created</th>
              <th>Subreddit</th>
              <th>Total_members</th>
              <th>Online_members</th>
              <th>Ticker Price</th>
            </tr>
          </thead>
           <tbody>
              {!this.state.isLoading?this.state.metric.map((metric)=>{
              return (
                 <tr key={metric.Created_date}>
                   <td>{metric.Created_date}</td>
                   <td>{metric.Subreddit}</td>
                   <td>{metric.Total_members}</td>
                   <td>{metric.Online_members}</td>
                   <td>{metric.Price}</td>
                 </tr>
              )
              })
              :
              <tr><td>"LOADING"</td></tr>
              }
           </tbody>
        </Table>
    </Container>
    </div>
    );
  }
}