import Navbar from "./Navbar"
import "../CSS/base.css"
import "../CSS/Header.css"
import img1 from "../Images/Veg bg.jpg";
import img2 from "../Images/Allu roti veg meal.jpg";
import img3 from "../Images/planmeal-weekly-menu-planning-removebg-preview.png"

export default function Header(props: any) {
  console.log("props : ",props.user)

  return (
    <>
      <header className="background-Color header">
        <Navbar setshow={props.setshow} show={props.show} user={props.setUser} setUser={props.setUser} handleLogout={props.handleLogout} />
        <div className='first-prv'>
          <div className='header-img-left'>
            <img className='img1' src={img1} alt="" />
            <img className="img2" src={img2} alt="" />
          </div>
          <div className='header-tag'>
            <h1 className='LOGO' data-aos="fade-right">𝓓𝓲𝓮𝓽𝓓𝓾𝓸...</h1>
            <div className='header-2ndtext-image-resp'>
              <div className='seconds'>𝑮𝒆𝒏𝒆𝒓𝒂𝒕𝒆 𝒀𝒐𝒖𝒓 <br /> 𝑪𝒖𝒔𝒕𝒐𝒎 𝑫𝒊𝒆𝒕 <br />𝒊𝒏 𝑺𝒆𝒄𝒐𝒏𝒅𝒔 <br />....</div>
              <img className='img3' data-aos="fade-down" src={img3} alt="" />
            </div>
          </div>
        </div>
        <div className='overdiv-btn1'>
          <button className='btn1'>Create My Diet Program Now -</button>
        </div>
      </header>
    </>
  )
}
