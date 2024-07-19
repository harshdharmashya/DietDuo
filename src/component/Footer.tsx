import React from 'react'
import "../CSS/Footer.css"
export default function Footer() {
  return (
    <>
    <div className='footer-container'>
        <div className='name-logo'>DietDuo</div>
        <div className='footer-data'>
            <div className='inner--footer'>
                <h2>Company</h2>
                <h6 className='inner-6'>Privacy Policy</h6>
                <h6>Terms and Conditions</h6>
            </div>
            <div className='inner--footer'>
                <h2>Product</h2>
                <h6 className='inner-6'>How it's work</h6>
            </div>
            <div className='inner--footer'>
                <h2>Resorces</h2>
                <h6 className='inner-6'>Blog</h6>
                <h6>contact</h6>
            </div>
            <div className='inner--footer'>
                <h2>Knowledge</h2>
                <h6 className='inner-6'>Meal plan to become healthy</h6>
                <h6>workout plan to become fit</h6>
            </div>
        </div>
        <div className='copyright'><p>Copyright 2024 AutoMealPlanner</p></div>
    </div>
    </>
  )
}
