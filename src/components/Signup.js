import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {

  const usenavigate = useNavigate();
  const [name, setname] = useState("")
  const [phone, setphone] = useState("")
  const [email, setemail] = useState("")
  const [createdPassword, setcreatedPassword] = useState("")
  const [confermPassword, setConfermPassword] = useState("");
  const [enrollment, setenrollment] = useState("")
  const [cource, setcource] = useState("")
  const [imgUrl, setimgUrl] = useState("")




  const data = {
    username: name,
    email: email,
    password: createdPassword,
    enrollment: enrollment,
    phone: phone,
    cource: cource,
    profileImg: imgUrl
  }

  const proseedSignUp = async (e) => {
    e.preventDefault();
    if (validation(true)) {
      const res =  await fetch(`http://localhost:5001/auth/signup`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      });
      const resp = await res.json();

      if (resp.success === true) {
        console.log(resp)
        alert("Resisterd Successfuly!")
        usenavigate('/login');
      }else{
        console.log(resp)
        // resp.errors?.map((err)=>{
        //   return alert(`Error : ${err.msg}`)
        // })
        alert(`Error : ${resp.error} `)
      }


    }



  }


  const validation = () => {
    let result = true;
    if (createdPassword !== confermPassword) {
      result = false;
      alert('password not match')
    }

    return result;
  }




  return (
    <div className='container'>

      <div className="signup-modal">
        <div className="modal-body">
          <h1 className="modal-title">Rigister Yourselfe</h1>
          <form className='signup-form' id='signupForm' onSubmit={proseedSignUp} action="" >
            <div className="text-field-row">
              <div className=" signup-field">
                <label htmlFor="inName">Student Name :</label>
                <input type="text" value={name} onChange={e => setname(e.target.value)} id='inName' required />
              </div>
              <div className=" signup-field">
                <label htmlFor="inphone">Phone Number :</label>
                <input type="text" value={phone} id="inPhone" maxLength="10" minLength="10" onChange={e => setphone(e.target.value)} required />
              </div>
            </div>
            <div className="text-field-row">
              <div className="signup-field">
                <label htmlFor="email">Email Id :</label>
                <input type="email" value={email} id='email' onChange={e => setemail(e.target.value)} required />
              </div>
              <div className="signup-field">
                <label htmlFor="email">Profile image :</label>
                <input type="text" value={imgUrl} onChange={e => setimgUrl(e.target.value)}  placeholder='Past here your profile image URL' required />
              </div>
            </div>
            <div className="text-field-row">
              <div className="signup-field">
                <label htmlFor="inEnroll">Enrollment No :</label>
                <input type="text" name='inEnroll' value={enrollment} onChange={e => setenrollment(e.target.value)}  minLength="9" required  />
              </div>
              <div className="signup-field">
                <label htmlFor="inCource">Cource :</label>
                <input type="text" name='inCource' value={cource} onChange={e => setcource(e.target.value)} required />
              </div>
            </div>
            <div className="text-field-row">
              <div className="signup-field">
                <label htmlFor="crtPass">Create Password :</label>
                <input type="text" value={createdPassword} id='crtPass' onChange={e => setcreatedPassword(e.target.value)}  minLength="5" required />
              </div>
              <div className=" signup-field">
                <label htmlFor="conPass">Conferm Password :</label>
                <input type="password" value={confermPassword} id='conPass' onChange={e => setConfermPassword(e.target.value)} required />
              </div>
            </div>
            <div className="text-field-row">
              <input type="submit" value="Ragister" />
            </div>

          </form>

        </div>
      </div>



    </div>
  )
}
