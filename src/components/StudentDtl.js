import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import qrCode from '../img/qr-code.png';

export default function StudentDtl(props) {

  const usenavigate = useNavigate();
  const [user, setuser] = useState("")

  const sToken = sessionStorage.getItem('sToken')



  useEffect(  () => {
     if (sToken === "" || sToken === null) {
      usenavigate("/login")
    }
    else {
      document.getElementById('loginBtn').style.display = "none";
      document.getElementById('logOutBtn').style.display = "unset";
      fetchUser();
    }
    // eslint-disable-next-line
  }, []);

  const fetchUser = async () => {


    const res = await fetch(`http://localhost:5001/auth/getuser`, {
      method: "POST",
      headers: { "auth-token": sToken }
    });
    const resp = await res.json();
    console.log(resp);
    setuser(resp)

  }

  return (
    <div >
     

      {/* template */}

      <div className="id-card-holder">
        <div className="id-card">
          <div className="header">
            <h1 style={{textAlign: "center", color: "rgb(255, 145, 0)", fontSize: "30px"}} >KORERO</h1> 
          </div>
          <div className="photo">
            <img src={user.profileImg} alt='img' />
          </div>
          <h2>{user.username}</h2>
          <div className="qr-code">
            <img src={qrCode} alt='QR' />
          </div>
          <h3>www.korero.info</h3>
          <hr />
          <p><strong>"{user.cource}"</strong>{user.enrollment} </p>
          <p>Ph: {user.phone} | E-mail: {user.email}</p>

        </div>
      </div>


    </div>
  )
}
