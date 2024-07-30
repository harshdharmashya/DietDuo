import React from 'react'
import Navbar from './Navbar'
import "../CSS/About.css"
import "../CSS/Footer.css"
import img1 from "../Images/women about.jpg"
import img2 from "../Images/meal about.jpg"
import img3 from "../Images/kitchen about.jpg"
import img4 from "../Images/shake about.jpg"
import Footer from './Footer'
import meal1 from "../Images/roll-removebg-preview.png"
import work1 from "../Images/about-work.png"

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
                    <h1>Our Wellness Journey</h1>
                    <p>Welcome to DietDuo, your ultimate companion for a healthier lifestyle! Our journey began with a simple yet powerful idea: to create a seamless blend of meal planning and workout routines tailored to individual needs. We believe that maintaining a healthy diet and exercise routine shouldn't be complicated or time-consuming. With DietDuo, we strive to make wellness accessible and enjoyable for everyone.</p>
                    <p className='extra-p'>Our team of nutritionists and fitness experts work tirelessly to bring you a wide variety of meal plans and workout suggestions, ensuring that you always have fresh, exciting options to choose from. Whether you're looking to lose weight, build muscle, or simply maintain a balanced diet, DietDuo is here to support you every step of the way.</p>
                    <p>Join us in our mission to make healthy living a delightful and achievable part of everyday life. Together, let's embrace a healthier, happier you with DietDuo!</p>
                </div>
            </div>
            <div className='About-meal-section'>
                <div className='meal-about'>
                    <div className='meal-image'>
                        <img className='info-image' data-aos="fade-right" src={meal1} alt="" />
                    </div>
                    <div className='meal-text'>
                        <h2 className='head-line'>Easily Add Healthy Meals to Your Schedule with DietDuo</h2>
                        <p>DietDuo is your go-to platform for seamlessly incorporating nutritious meals into your daily routine. We understand the challenges of maintaining a balanced diet, especially with a busy lifestyle. Our easy-to-use interface allows you to select from a variety of healthy meal options tailored to your preferences.</p>
                        <p>
                            Whether you're planning for breakfast, lunch, or dinner, DietDuo offers diverse choices to suit every palate. You can customize your meal plan for each day of the week, ensuring you have a well-rounded and delicious menu at your fingertips.
                        </p>
                        <p className='extra-p'>
                            Our goal is to make healthy eating convenient and enjoyable, so you can focus on achieving your wellness goals. Join us on this journey and let DietDuo simplify your path to a healthier lifestyle.
                        </p>
                    </div>
                </div>
            </div>
            <div className='about-workout-section'>
                <div className='meal-about'>
                <div className='work-text'>
                        <h2 className='work-head-line'>Easily Add Personalized Workouts to Your Daily Schedule with DietDuo</h2>
                        <p>DietDuo not only supports your dietary needs but also helps you maintain an active lifestyle by offering personalized workout plans. Our platform allows you to easily select exercises based on your fitness goals, whether it's building strength, improving flexibility, or enhancing cardiovascular health.</p>
                        <p className='extra-p'>
                        You can schedule workouts for each day of the week, ensuring a well-balanced routine that fits seamlessly into your busy life. With a variety of exercises to choose from, DietDuo makes it simple to stay motivated and committed to your fitness journey
                        </p>
                        <p>
                        Let us help you achieve a healthier, more active lifestyle. Start incorporating regular exercise into your daily schedule with DietDuo and experience the benefits of a balanced approach to wellness.
                        </p>
                    </div>
                    <div className='work-image-about'>
                        <img className='info-work-image' data-aos="fade-down" src={work1} alt="" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
