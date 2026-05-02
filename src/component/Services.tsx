import img1 from "../Images/workout services.jpg"
import img2 from "../Images/Meal services.jpg"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../CSS/Services.css"
import { motion } from "framer-motion"

export default function Services() {
    return (
        <>
            <div className='services-container'>
            <motion.div
              className='headline-work services-title display-font'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              Our services
            </motion.div>
                <div className='card-container'>
                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.05 }}
                      whileHover={{ y: -6 }}
                    >
                    <Card sx={{ maxWidth: 300,objectFit:'cover', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.35)' }}>
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
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.12 }}
                      whileHover={{ y: -6 }}
                    >
                    <Card sx={{ maxWidth: 300, borderRadius: '18px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.35)' }}>
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
                    </motion.div>
                </div>
            </div>
        </>
    )
}
