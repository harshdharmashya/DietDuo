import "../CSS/navbar.css"
import { Link } from 'react-router-dom'
export default function Navbar(props: any) {
  console.log("props nav: ",props.user)

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-trans bgcolor navbar-glass">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">𝕯𝖎𝖊𝖙𝕯𝖚𝖔</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
              </li>

              {
                props.user ?
                  <>
                    <li className="nav-item">
                      <Link className='nav-link active' aria-current="page" to="" onClick={() => props.handleLogout()}>Logout</Link>
                    </li>
                    <li className="nav-item">
                      <Link className='nav-link active' aria-current="page" to="/profile">Profile</Link>
                    </li>
                  </>
                  :
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className='nav-link active' aria-current="page" to="/register">Sign up</Link>
                    </li>
                  </>
              }
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/meal">Meal</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/work_out">Work-out</Link>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}
