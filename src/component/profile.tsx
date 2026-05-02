import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import default_user from "../Images/user image default.png"
import Navbar from "./Navbar";
function Profile(props: any) {
  const [userDetails, setUserDetails] = useState({
    photo: "",
    firstName: ""
  });
  const [email, setemail] = useState("");
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user: any) => {
      console.log("user",user);
      setemail(user.email);
      const docRef = doc(db, "Users", user.uid);
      console.log(docRef);
      const docSnap: any = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Navbar user={props.user} setUser={props.setUser} handleLogout={props.handleLogout} />
      <div style={{height:'95vh'}} className="login-section">
        <h1 style={{ display: "block", margin: '1% auto', width: 'auto' }}>𝓓𝓲𝓮𝓽𝓓𝓾𝓸</h1>

        {userDetails ? (
          <>
            <h4 style={{ margin: '2% auto' }}>Welcome {userDetails.firstName}</h4>
            <div className="form profile">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={default_user}
                  width={"20%"}
                  style={{ borderRadius: "50%" }}
                  alt="user_image"
                />
              </div>
              <div>
                <p>Email: {email}</p>
              </div>
              <button className="btn btn-primary center" onClick={() => props.handleLogout()}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
export default Profile;