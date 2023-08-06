import { useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import stdData from '../database/data.json'

export default function Login() {
  
  const logOutBtn = document.getElementById('logOutBtn');
  const loginBtn = document.getElementById('loginBtn');

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const usenavigate = useNavigate();

  useEffect(()=>{
    sessionStorage.clear()
  }, [] );

  const validate =()=>{
    let result = true;
    if(email === ' ' || email === null){
      result = false;
      console.log("please enter email Id");
    }
    if(password === ' ' || password === null){
      result = false;
      console.log("please enter password");
    }
    return result;
  }

  const proseedLogin = async (e) =>{
    e.preventDefault();

    const data = {
      email: email,
      password: password
    }

    if(validate(true)){
      const res = await fetch(`http://localhost:5001/auth/login`, {
        method:"POST",
        redirect:"follow",
        headers:{"Content-type": "application/json"},
        body : JSON.stringify(data)
      })
      const resp = await res.json();
      if (resp.success) {
        sessionStorage.setItem("sToken", resp.authToken)
        usenavigate('/');
        
        logOutBtn.style.display="unset";
        loginBtn.style.display="none";
      }else{
        console.log(resp)
        alert(`Error : ${resp.error}`)
      }
      
    }else{
      alert('Please fill all the fields');
    }
  }



  
  return (
    <div className='container'>
      <div className="login-modal"> 
        <div className="modal-body">
          <h1 className="modal-title">Login to colloge</h1>
          <form className="login-form" onSubmit={proseedLogin} action="">
            <div className="text-field">
              <input value={email} onChange={e=>setemail(e.target.value)} type="email" id='emailId' required/>
              <span></span>
              <label htmlFor="">Email Id</label>
            </div>
            <div className="text-field">
              <input type="password" value={password} onChange={e=>setpassword(e.target.value)} id='password' required/>
              <span></span>
              <label htmlFor="">Password</label>
            </div>
            <div className="pass"><a href="forget-pass.html">Forget Password?</a></div>
            <input type="submit" name="submit" value="Login"/>
            <div className="singup-link">
              Not a Member ? <Link to="/signup">Rigester Here</Link>
            </div>
          </form>

        </div>
      </div>


    </div>
  )
}
