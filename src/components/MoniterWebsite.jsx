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
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import emailjs from '@emailjs/browser';

require('dotenv').config();

var pingInterval;
export default function MoniterWebsite() {
  const [index, setindex] = React.useState('');
  const [websites, setwebsites] = React.useState([]);
  const [mClick, setmClick] = React.useState(false);
  




  //Sending email to given EmailId
  const sendEmail=async()=>{
    const templateParams={
      email:websites[index].email,
      message:"Your Service History is \n"+websites[index].history.map((e,idx)=>`${idx+1} :: Status Code => ${e.statusCode} at ${e.timestamp}\n`).join(),
      reply_to:websites[index].email
    }
    
    emailjs.send(process.env.SERVICE_ID,process.env.TEMPLATE_ID, templateParams, process.env.USER_ID)
	.then((response) => {
    alert("Email Sent Successfully");
	   console.log('SUCCESS!', response.status, response.text);
	}, (err) => {
    
    alert("Email has not been Sent Successfully");
	   console.log('FAILED...', err);
	});
  }


  const webPingFunction=async()=>{

    const web=[...websites];
    
    const res = await fetch(web[index].url)
    console.log(res);
    let his=web[index].history;
    his.push({statusCode:res.status,timestamp:new Date()});
    setwebsites(web);
  }


  const updateWebsite =async()=>{
    const web=websites[index];
    const data={_id:web._id,history:web.history};
    const res=await axios.put("http://localhost:5000/updateWebsite",data).then(result=>{
      console.log('WebSite Data Updated Successfully');
    }).catch(err=>{
      console.log("Error While Updating Website Data");
    })
  }


  React.useEffect(() => {
    return () => {
      updateWebsite();
      clearInterval(pingInterval);
    };
  }, []);


  const handleCloseMoniter=()=>{
    updateWebsite();
    sendEmail();
    clearInterval(pingInterval);
    setmClick(false);
  }



  const handleMoniterWebsite= ()=>{
    setmClick(true);
    webPingFunction();
    pingInterval=setInterval(webPingFunction,5000);
  }


  const handleChange = async(event) => {
    setindex(event.target.value);
  };


  React.useEffect(async () => {
    const res = await axios.get('http://localhost:5000/getWebsites');
    if (res.status === 200) {
      setwebsites(res.data);
      if (res.data.length === 0) { alert('No Website Available to Moniter'); }
    } else {
      alert('Error While Getting Data from database');
    }
  }, []);

  return (
    <Paper elevation={5} sx={{ m: 8, minWidth: 400 }} >
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
          <Button variant="contained" onClick={handleMoniterWebsite} >Moniter</Button>
        </Grid>
              {
                mClick&& <Grid item xs={10}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="div">
                    {websites[index].title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Latest Status :: {websites[index].latestStatus===0?'Server Down':"Server Up"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant='outlined' onClick={handleCloseMoniter}>Cancel Monitering</Button>
                  </CardActions>
                </Card>
              </Grid>
              }
       </Grid>
    </Paper>
  );
}
