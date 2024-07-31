import img1 from "../Images/girl-removebg-preview.png"
import "../CSS/Preference.css"
export default function Preference() {
  return (
    <>
        <div className='Preference'>
            <div className='text-section'>
              <h2>Need Help Creating A Meal Plan That Fits Your Macros And Foods Preferences?</h2>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis beatae voluptatum nulla facilis, mollitia at sunt reiciendis tempore architecto itaque? Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <button className="button-desk">Create My Diet Program Now -</button>
            </div>
              <button className="button-res">Create My Diet</button>
            <div className='image-section'><img src={img1} alt="" /></div>
        </div>
    </>
  )
}
