import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default class Home extends Component {
    chartdata = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

    state = {
        isLoading: true,
        metric: [],
        chartdata: this.chartdata,
        error: null
    }

    constructor(props) {
        super(props);
    }

fetch_metrics() {
    fetch(`http://localhost:8000/subreddit_activity/?subreddit=https://www.reddit.com/r/Superstonk/`)
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
    this.fetch_metrics();
}

render() {
    return (
        <Container style={{ marginTop: '50px' }}>
        <LineChart
          width={1000}
          height={500}
          data={this.state.metric}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Created_date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Total_members" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Online_members" stroke="#82ca9d" />
        </LineChart>

       <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date Created</th>
              <th>Subreddit</th>
              <th>Total_members</th>
              <th>Online_members</th>
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
                 </tr>
              )
              })
              :
              <tr><td>"LOADING"</td></tr>
              }
           </tbody>
        </Table>
     </Container>
    );
  }
}