import React from 'react'
import img1 from "../Images/workout services.jpg"
import img2 from "../Images/Meal services.jpg"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../CSS/Services.css"
export default function Services() {
    return (
        <>
            <div className='services-container'>
            <div className='headline-work'>𝓞𝓾𝓻 𝓢𝓮𝓻𝓿𝓲𝓬𝓮𝓼..</div>
                <div className='card-container'>
                    <Card sx={{ maxWidth: 300,objectFit:'cover' }}>
                        <CardMedia className='card-media' sx={{color:'black'}}
                            component="img"
                            alt="workout"
                            height="200"
                            image={img1}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                                Work out
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Exercising is one of the most vital processes that everyone should incorporate into their lives.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                            component="img"
                            alt="meal"
                            height="200"
                            image={img2}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                                Meal
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Eating a variety of foods and consuming less salt, sugars and saturated and industrially..
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
        </>
    )
}
