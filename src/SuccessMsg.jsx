import React from 'react'

export default function SuccessMsg (props){

    return (
        
        <div role="alert">
            <div className="flex justify-between items-center bg-green-500 text-white font-bold rounded-t px-4 py-2">
                <div>  
                    Success!!!
                </div>
                <div>
                    <button onClick={props.doThis} className="cursor-pointer">Close</button>
                </div>
            </div>
            <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                <p>{props.message}</p>
            </div>
        </div>

    );
}