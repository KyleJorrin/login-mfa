import React from 'react'

export default function Mail (props){

    return (
            
        <div role="alert">
            <div className="bg-blue-300 text-white font-bold rounded-t px-4 py-2">
                Inbox for {props.user}
            </div>
            <div className="border border-t-0 border-blue-400 rounded-b bg-blue-100 px-4 py-3 text-slate-700">
                <p>{props.message}</p>
            </div>
        </div>
        
    );
}