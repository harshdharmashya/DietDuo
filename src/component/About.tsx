import React from 'react'
import Navbar from './Navbar'
import "../CSS/About.css"
import "../CSS/Footer.css"
import img1 from "../Images/women about.jpg"
import img2 from "../Images/meal about.jpg"
import img3 from "../Images/kitchen about.jpg"
import img4 from "../Images/shake about.jpg"
import Footer from './Footer'
export default function About() {
    return (
        <>
            <Navbar />
            <div className='About-section'>
                <div className='about-info'>
                    <div className='info-text'>
                        <p>OUR MISSION</p>
                        <h1>Transform your meals,<br /> transform your life.</h1>
                        <p className='lorem'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius dolorem illum, iure perferendis, dolor alias quisquam accusamus, dignissimos soluta molestias nemo ipsa aut. Perferendis neque ullam fugit aut vitae aspernatur!
                        </p>
                    </div>
                    <div className='info-image'>
                        <div className='two'>
                            <img className='info-img-inner-01' src={img1} alt="" />
                            <img className='info-img-inner-02 upper' src={img2} alt="" />
                        </div>
                        <div className='two'>
                            <img className='info-img-inner-02 lower' src={img3} alt="" />
                            <img className='info-img-inner-01' src={img4} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='about-2nd-story'>
                <div className='Our-story'>
                    <h2>Our Wellness Journey</h2>
                    <p>Welcome to DietDuo, your ultimate companion for a healthier lifestyle! Our journey began with a simple yet powerful idea: to create a seamless blend of meal planning and workout routines tailored to individual needs. We believe that maintaining a healthy diet and exercise routine shouldn't be complicated or time-consuming. With DietDuo, we strive to make wellness accessible and enjoyable for everyone.</p>
                    <p>Our team of nutritionists and fitness experts work tirelessly to bring you a wide variety of meal plans and workout suggestions, ensuring that you always have fresh, exciting options to choose from. Whether you're looking to lose weight, build muscle, or simply maintain a balanced diet, DietDuo is here to support you every step of the way.</p>
                    <p>Join us in our mission to make healthy living a delightful and achievable part of everyday life. Together, let's embrace a healthier, happier you with DietDuo!</p>
                </div>
            </div>
            <Footer/>

        </>
    )
}
