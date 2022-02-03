import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Grid } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



export default function WebsiteHistory() {


  const toastui = require('@toast-ui/react-chart');
  const PieChart = toastui.PieChart;
  //Pie Chart Data
  




  const [index, setindex] = React.useState('');
  const [websites, setwebsites] = React.useState([]);
  const [mClick, setmClick] = React.useState(false);
  const [percentage,setPercentage]=React.useState({"up":0,"down":0});





  //

  const data = {
    categories: ['Report'],
    series: [
      {
        name: 'Uptime',
        data: percentage.up,
      },
      {
        name: 'Downtime',
        data: percentage.down,
      }
    ],
  };
  const options = {
    chart: { title: '', width: 600, height: 400 },
  };
  

  const handleChange = async(event) => {
    setindex(event.target.value);
  };


  const handleHistoryWebsite= ()=>{
    let p=0;
    let d=0;
    console.log(websites[index].history);
    websites[index].history.forEach((e)=>{
      if(e.statusCode==200){
        p=p+1;
      }else{
        d=d+1;
      }
    })
    p=(p/websites[index].history.length)*100;
    d=(d/websites[index].history.length)*100;
    console.log(p,d);
    setPercentage({...percentage,['up']:p,['down']:d});
    setmClick(true);
  }
  React.useEffect(async () => {
    const res = await axios.get('http://localhost:5000/getWebsites');
    if (res.status === 200) {
      setwebsites(res.data);
      
      if (res.data.length === 0) { alert('No Website Available to Moniter'); }
    } else {
      alert('Error While Getting Data from database');
    }
  }, []);
  return <Paper elevation={5} sx={{ m: 8, minWidth: 400 }} >
  <Grid container sx={{ p: 5 }} justifyContent="center" spacing={4}>
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Website</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={index}
          label="Website"
          onChange={handleChange}
        >
          {
            websites.map((e,idx) =>
              <MenuItem key={e._id} value={idx}>{e.title}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={3}>
      <Button variant="contained" onClick={handleHistoryWebsite} >See History</Button>
    </Grid>
          {
            mClick&& <Grid item xs={10}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                {websites[index].title}
                </Typography>
                {<PieChart data={data} options={options}/>}
              </CardContent>
            </Card>
          </Grid>
          }
   </Grid>
</Paper>
}
