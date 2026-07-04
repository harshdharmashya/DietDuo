import "../CSS/navbar.css"
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar(props: any) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'active-link' : '';

  return (
    <>
      <motion.nav 
        className="navbar navbar-expand-lg navbar-dark bg-trans bgcolor navbar-glass"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <div className="container-fluid px-lg-4">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <motion.span 
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
            >
              🥗
            </motion.span>
            𝕯𝖎𝖊𝖙𝕯𝖚𝖔
          </Link>
          <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-2">
              <motion.li className="nav-item" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link className={`nav-link fw-semibold ${isActive('/')}`} to="/">Home</Link>
              </motion.li>
              <motion.li className="nav-item" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link className={`nav-link fw-semibold ${isActive('/about')}`} to="/about">About</Link>
              </motion.li>

              <div className="vr mx-3 d-none d-lg-block bg-white opacity-25" style={{ height: '24px' }}></div>

              {
                props.user ?
                  <>
                    <motion.li className="nav-item" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link className={`nav-link fw-semibold ${isActive('/meal')}`} to="/meal">Meal</Link>
                    </motion.li>
                    <motion.li className="nav-item" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link className={`nav-link fw-semibold ${isActive('/work_out')}`} to="/work_out">Work-out</Link>
                    </motion.li>
                    <motion.li className="nav-item ms-lg-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link className={`nav-link fw-semibold ${isActive('/profile')}`} to="/profile">Profile</Link>
                    </motion.li>
                    <motion.li className="" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <button 
                        className="btn btn-sm rounded-pill px-4 fw-bold ms-lg-2 d-flex align-items-center gap-2" 
                        style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                        onClick={(e) => {
                          const btn = e.currentTarget;
                          btn.innerHTML = '<div class="spinner-border spinner-border-sm" role="status"></div> Logging out...';
                          btn.disabled = true;
                          props.handleLogout();
                        }}
                      >
                        Logout
                      </button>
                    </motion.li>
                  </>
                  :
                  <>
                    <motion.li className="nav-item ms-lg-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link className={`nav-link fw-semibold ${isActive('/login')}`} to="/login">Login</Link>
                    </motion.li>
                    <motion.li className="nav-item" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link 
                        className="btn btn-sm rounded-pill px-4 fw-bold shadow-sm ms-lg-2" 
                        style={{ backgroundColor: '#cddc39', color: '#1A5319', border: 'none' }} 
                        to="/register"
                      >
                        Sign up
                      </Link>
                    </motion.li>
                  </>
              }
            </ul>
          </div>
        </div>
      </motion.nav>
    </>
  )
}
