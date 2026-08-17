import React, {useContext} from 'react'


export default function Card (props){


    return (
        <div className="bg-sky-200 block max-w-sm p-6 rounded-base shadow-lg rounded-xl transition-transform duration-200 hover:scale-110">
            <h5 className="mb-3 text-2xl text-gray-950 font-semibold tracking-tight text-heading leading-8">{props.title}</h5>
            <p className="text-body mb-6">{props.desc}</p>
            <div className="flex items-center justify-between">
                <button className="inline-flex items-center text-gray-950 bg-brand border border-sky-400 rounded-xl bg-sky-300 hover:bg-sky-400 cursor-pointer font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                    Edit
                    <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                </button>
                {props.role === "admin" &&
                    <button onClick={() => props.delete(props.id)} className="inline-flex items-center text-gray-950 bg-brand border border-sky-400 rounded-xl bg-sky-300 hover:bg-sky-400 cursor-pointer font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                        Delete
                    </button>
                }
            </div>
        </div>
    );
}