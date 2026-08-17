import React, { useState, useContext } from 'react';
import { useNavigate, Navigate} from 'react-router-dom';
import { UserContext } from './App';
import Warning from './Warning.jsx'
import SuccessMsg from './SuccessMsg.jsx'
import Mail from './Mail.jsx'

const Status = Object.freeze({
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAIL: 'FAIL'
});

export default function Auth (){

    const { userData, setUserData, curUser, setCurUser, otp, setOTP} = useContext(UserContext);
    const [curStatus, setCurStatus] = useState('PENDING');
    const [message, setMessage] = useState('message');
    const [mailOpen, setMailOpen] = useState(false);
    const [alertOn, setAlertOn] = useState(false);

    const navigate = useNavigate();

    if (curUser === null) {return <Navigate to="/" replace={true} />}

    function authenticate (event){
        event.preventDefault();
        const input = (event.target.elements.otpcode.value);

        const isNumeric = /^\d+$/.test(input);
        if (!isNumeric) {
            //Please enter a valid numeric value:
            setMessage("Please enter a valid numeric value");
            setCurStatus('FAIL');
            toggleAlert(true);
            return;
        }

        const otp_query = parseInt(input, 10);

        if (otp_query !== otp) {
            //The value you entered was incorrect:
            setMessage("The value you entered was incorrect");
            setCurStatus('FAIL');
            toggleAlert(true);
            return;
        }

        setMessage("Verification Complete");
        setCurStatus('SUCCESS');
        toggleAlert(true);
        setOTP(0);

        navigate("/dashboard", { replace: true });
    }

    function toggleAlert(value){
        setAlertOn(value);
    }

    return (
        <>
            <div id="mfa-card" className="bg-gray-200 shadow-lg fixed inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-semibold text-center">Verification Needed</div>
                <div>
                    <p className="text-sm font-sans">A code was sent to your email. Please enter in the box below:</p>
                </div>
                <div className="relative">
                    <form id="mfa-form" onSubmit={authenticate}>
                        <div className="py-4">
                            <span className="px-2">
                                <input type="text" id="otpcode" maxLength="6" minLength="6" className="w-30 h-12 text-center text-xl font-bold border border-gray-500 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none" />
                            </span>
                            <span className="px-2">
                                <input type="submit" value="Continue" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"></input>
                            </span>
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
            <div className="relative">
                {mailOpen === false &&
                    <button id="mail-button" onClick={() => {setMailOpen(m => !m);}}>
                        <img src="public/email.png" alt="mail" className="w-4 h-auto block"/>
                    </button> 
                }
                {mailOpen === true && <Mail user={curUser.email} message={`Code is: ${otp}`}/>}
            </div>
        </>
    );
}