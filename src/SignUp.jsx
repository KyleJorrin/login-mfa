import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from './App';
import Warning from './Warning.jsx'
import SuccessMsg from './SuccessMsg.jsx'

const Status = Object.freeze({
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAIL: 'FAIL'
});

export default function SignUp (){

    const { userData, setUserData, ...unused } = useContext(UserContext);
    const [curStatus, setCurStatus] = useState('PENDING');
    const [message, setMessage] = useState('message');
    const [alertOn, setAlertOn] = useState(false);
    

    function handleSubmit(event){
        event.preventDefault();
        const email_query = (event.target.elements.userin.value).trim();
        const pass_query = (event.target.elements.passin.value).trim();

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

        if (userData.some(user => user.email === email_query)){
            //An account with this email already exists
            setMessage("An account with this email already exists");
            setCurStatus('FAIL');
            toggleAlert(true);
            return;
        }

        toggleAlert(true);
        setMessage("Account successfully created!!! You may now login");
        setCurStatus('SUCCESS');
        const newUser = {email: email_query, pass: pass_query, permissions: "user"};
        setUserData(u => [...u, newUser]);
        console.log((userData.length + 1))
    }

    function toggleAlert(value){
        setAlertOn(value);
    }

    return (
        <>
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-blue-400/80 backdrop-blur-sm">
                <div className="text-4xl text-white font-bold">Create An Account:</div>
                <div className="relative">
                    <form id="su-form" onSubmit={handleSubmit}>
                        <div>
                            <h2 className="text-white font-bold text-xl py-4">Please enter an email and password</h2>
                        </div>
                        <div>
                            <label htmlFor="userin" className="text-white font-bold px-4"> Email:</label>
                            <input type="text" id="userin" placeholder="email" className="bg-white"/>
                        </div>
                            <br></br>
                        <div>
                            <label htmlFor="passin" className="text-white font-bold px-4">Password:</label>
                            <input type="text" id="passin" placeholder="password" className="bg-white"/>
                        </div>
                        <div className="flex justify-center items-center py-6">
                            <input type="submit" id="su-submit" value="Create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
                        </div>
                    </form>
                </div>
                <div className="absolute ">    
                    {curStatus === Status.SUCCESS && alertOn && 
                        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                            <SuccessMsg message={message} doThis={() => toggleAlert(false)}/>
                            <Link to="/login">
                                <button className="outline outline-blue-700 bg-white hover:bg-neutral-300 text-blue-700 font-bold py-2 px-4 rounded">login</button> 
                            </Link> 
                        </div>
                    }
                    {curStatus === Status.FAIL && alertOn && 
                        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                            <Warning message={message} doThis={() => toggleAlert(false)}/>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}