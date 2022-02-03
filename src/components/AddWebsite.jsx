import React from 'react';

import { useState } from 'react';
import { Paper, TextField, Grid,Button } from '@mui/material';
import axios from 'axios';


export default function AddWebsite() {
    const [values, setValues] = useState({ url: '', title: '', email: '' })
    const changeHandler = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }


    
    const handleAddWebsite = async() => {
        const data = Object.assign({}, values);
        data.history=[];
        data.latestStatus=0;
        const res = await axios.post('http://localhost:5000/addWebsite', data);
        if(res.status===200){
            alert('Website Has been Added Successfully');
        }else{
            alert('Error While Adding Website');
        }
        let v={url:'',title:'',email:''}
        setValues(v);
    }
    return <Paper elevation={5} sx={{ m: 20 }} >
        <Grid container justifyContent={'center'}  spacing={3}>
            <Grid item xs={10} sm={10} md={10}>

                <TextField
                    id="outlined-name"
                    label="Url"
                    fullWidth
                    value={values.url}
                    name={'url'}
                    onChange={(e) => changeHandler(e)}
                />
            </Grid>
            <Grid item xs={10} sm={10} md={10}>

                <TextField
                    id="outlined-name"
                    label="Title"
                    fullWidth
                    value={values.title}
                    name={'title'}
                    onChange={(e) => changeHandler(e)}
                />
            </Grid>
            <Grid item xs={10} sm={10} md={10}>

                <TextField
                    id="outlined-name"
                    label="Email"
                    fullWidth
                    value={values.email}
                    name={'email'}
                    onChange={(e) => changeHandler(e)}
                />

            </Grid>
            <Grid item  xs={10} sm={10} md={10}>
                <Button variant='contained' color='secondary' onClick={handleAddWebsite} sx={{mb:2}}>
                    Add Website
                </Button>
            </Grid>
            </Grid>
        </Paper>;
}
