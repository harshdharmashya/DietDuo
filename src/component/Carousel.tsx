import img1 from "../Images/BreakFast.png"
import img2 from "../Images/Fruits.png"
import img3 from "../Images/Rajma Chawal.png"
import img4 from "../Images/Car 2.png"
import "../CSS/Carousel.css"
import { motion } from "framer-motion"

export default function Carousel() {
    return (
        <>
            <motion.section
                className="marquee"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={img1} className="d-block w-100 add-image" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={img2} className="d-block w-100 add-image" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={img3} className="d-block w-100 add-image" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={img4} className="d-block w-100 add-image" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </motion.section>
        </>
    )
}
