import React, {useState} from 'react'

export default function Warning (props){
    
    return (

        <div role="alert">
            <div className="flex justify-between items-center bg-red-500 text-white font-bold rounded-t px-4 py-2">
                <div>
                    Attention
                </div>
                <div>
                    <button onClick={props.doThis} className="cursor-pointer">Close</button>
                </div>
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>{props.message}</p>
            </div>
        </div>     
          
    );
}