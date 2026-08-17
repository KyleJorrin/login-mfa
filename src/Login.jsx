import React, { useState, useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { UserContext } from './App';
import Warning from './components/Warning.jsx'
import SuccessMsg from './components/SuccessMsg.jsx'

const Status = Object.freeze({
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAIL: 'FAIL'
});

export default function Login (){

    const { userData, setUserData, curUser, setCurUser, otp, setOTP} = useContext(UserContext);
    const [curStatus, setCurStatus] = useState('PENDING');
    const [message, setMessage] = useState('message');
    const [alertOn, setAlertOn] = useState(false);

    const navigate = useNavigate();

    function handleLogin (event){
        event.preventDefault();
        const email_query = (event.target.elements.userlog.value).trim();
        const pass_query = (event.target.elements.passlog.value).trim();

        if (email_query === "" || pass_query === ""){
            //Please fill in all fields
            setMessage("Please fill in all fields");
            setCurStatus('FAIL');
            toggleAlert(true);
            return;
        }

        if (!email_query.includes("@")){
            //Please enter a valid email address
            setMessage("Please enter a valid email address");
            setCurStatus('FAIL');
            toggleAlert(true);
            return;
        }

        if (!userData.some(user => user.email === email_query)){
            //An account with this email already exists
            setMessage("No account with this email exists");
            setCurStatus('FAIL');
            toggleAlert(true);
            return;
        }

        const user = userData.find(user => user.email === email_query)

        if (user.pass !== pass_query){
            //Email and password do not match
            setMessage("The email and passwords do not match");
            setCurStatus('FAIL');
            toggleAlert(true);
            return;
        }

        setMessage("Login Success!!!");
        setCurStatus('SUCCESS');
        toggleAlert(true);
        setCurUser(user);
        //Generate a MFA OTP and "save" somewhere
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(`Code: ${otp}`);
        setOTP(otp);
        navigate("/auth", { replace: true });
    }

    function toggleAlert(value){
        setAlertOn(value);
    }

    return (
        <>
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-blue-400/80 backdrop-blur-sm">
                <div className="text-4xl text-white font-bold pb-4">Login:</div>
                <div className="relative">
                    <form id="login-form" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="userlog" className="text-white font-bold px-4"> Email:</label>
                            <input type="text" id="userlog" placeholder="email" className="bg-white"/>
                        </div>
                            <br></br>
                        <div>
                            <label htmlFor="passlog" className="text-white font-bold px-4">Password:</label>
                            <input type="text" id="passlog" placeholder="password" className="bg-white"/>
                        </div>
                        <div className="flex justify-center items-center py-6">
                            <input type="submit" id="login-submit" value="Log in" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
                        </div>
                    </form>
                </div>
                <div className="absolute">
                    {curStatus === Status.FAIL && alertOn && 
                        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                            <Warning message={message} doThis={() => toggleAlert(false)}/>
                        </div>
                    }
                    {curStatus === Status.SUCCESS && alertOn && 
                        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                            <SuccessMsg message={message} doThis={() => toggleAlert(false)}/>
                        </div>
                        
                    }
                </div>
            </div>
        </>
    );
}