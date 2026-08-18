import Navbar from "./Navbar"
import "../CSS/base.css"
import "../CSS/Header.css"
import { motion } from "framer-motion"
import img1 from "../Images/Veg bg.png";
import img2 from "../Images/Allu roti veg meal.jpg";
import img3 from "../Images/planmeal-weekly-menu-planning-removebg-preview.png"

const heroStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.15 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
}

export default function Header(props: any) {
  const scrollToMeals = () => {
    document.getElementById("meals")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      <header className="background-Color header">
        <Navbar setshow={props.setshow} show={props.show} user={props.user} setUser={props.setUser} handleLogout={props.handleLogout} />
        <motion.div
          className="first-prv"
          variants={heroStagger}
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
        >
          <motion.div className="header-img-left" variants={heroItem}>
            <motion.img
              className="img1"
              src={img1}
              alt="Fresh vegetables"
              whileHover={{ scale: 1.04, rotate: -1 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            />
            <motion.img
              className="img2"
              src={img2}
              alt="Balanced meal"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            />
          </motion.div>
          <motion.div className="header-tag" variants={heroItem}>
            <motion.h1 className="LOGO display-font" variants={heroItem}>
              DietDuo
            </motion.h1>
            <div className="header-2ndtext-image-resp">
              <motion.div className="seconds" variants={heroItem}>
                Generate Your <br /> Custom Diet <br /> in Seconds
              </motion.div>
              <motion.img
                className="img3"
                src={img3}
                alt=""
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
        <div className="overdiv-btn1">
          <motion.button
            type="button"
            className="btn1"
            onClick={scrollToMeals}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Create my diet program
          </motion.button>
        </div>
      </header>
    </>
  )
}
