import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import default_user from "../Images/user image default.png"
function Profile() {
  const [userDetails, setUserDetails] = useState({
    photo: "",
    firstName: "",
    email: ""
  });
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user: any) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
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

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div className="login-section">
            <h1 style={{display:"block",margin:'1% auto',width:'236px'}}>𝓓𝓲𝓮𝓽𝓓𝓾𝓸</h1>

      {userDetails ? (
        <>
              <h4 style={{margin:'2% auto'}}>Welcome {userDetails.firstName}</h4>
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
              <p>Email: {userDetails.email}</p>
              <p>First Name: {userDetails.firstName}</p>
              {/* <p>Last Name: {userDetails.lastName}</p> */}
            </div>
            <button className="btn btn-primary center" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Profile;