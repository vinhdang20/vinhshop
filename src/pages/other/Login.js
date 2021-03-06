import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import Items from '../shop/Items'
function Login() {

    const [userEmail, setUserEmail] = useState('vinhdang')
    const [userPassword, setUserPassword] = useState('123456')
    const getValueEmail = (e) => setUserEmail(e.target.value)
    const getValuePassword = (e) =>  setUserPassword(e.target.value)
    const [errorMess, setErrorMess] = useState('')
    const [usersDb, setUsersDb] = useState([])
    const cssError = {
        "color" : "red",
        "marginLeft": "0.8em"
    }
    useEffect(() => {
              const getInfo = async ()=>{
                  try {
                      const {data} = await axios.get('https://vinhshop.herokuapp.com/api/users')
                 
                    setUsersDb(data)
                  } catch (error) {
                      console.log(error)
                  }
              }  
              getInfo()
    }, [])
    const checkLogin = () =>{
        const check = usersDb.find((item) => item.name === userEmail)
        if(check) {
            if(check.password === userPassword) {
                console.log('login success')
                const userInfo = {'email' : userEmail,'password': userPassword,'userID': check._id}
                localStorage.setItem('user', JSON.stringify(userInfo) )
                
            }else setErrorMess('password invalid')
        }
        else setErrorMess('Your email invalid')
        
    }
    
    const handleClick = (e) => {
        e.preventDefault()
        checkLogin()
            if(localStorage.getItem('user'))  window.location=('/')
    }

 
    return (
        <div className="container">
            <div className="col-md-6">
                <form className="bg-white p-5 contact-form">
                    {/* action="#" method="get" */}
                    <div className="form-group">
                        <input type="text" name="userEmail" 
                        value={userEmail}
                        required 
                        onChange={getValueEmail} 
                        className="form-control" placeholder="Your Email" />
                        
                    </div>
                    <div className="form-group">
                        <input type="password" 
                        name="userPassword" 
                        required
                        value={userPassword}
                        onChange={getValuePassword} 
                        className="form-control" placeholder="Your password" />
                        <p style={cssError}> {errorMess}</p>
                    </div>
                    <div className="form-group">
                        {/* <button onClick={handCheck}>test</button> */}
                        <input type="submit" onClick={handleClick} value="Login" className="btn btn-primary py-3 px-5" />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login
