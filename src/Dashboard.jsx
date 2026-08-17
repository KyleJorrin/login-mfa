import React, { useState, useContext} from 'react'
import { useNavigate, Navigate} from 'react-router-dom';
import { UserContext, CardContext } from './App';
import Card from './components/Card.jsx'

const Status = Object.freeze({
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAIL: 'FAIL'
});


export default function Dashboard (){

    const { userData, setUserData, curUser, setCurUser, otp, setOTP} = useContext(UserContext);
    const { cardList, setCardList} = useContext(CardContext);
    const [isAdding, setIsAdding] = useState(false);

    console.log(`Current user is null: ${curUser === null}`);
    
    const navigate = useNavigate();

    if (curUser === null) {return <Navigate to="/" replace={true} />}


    function handleLogOut () {
        setCurUser(null);
        navigate("/", { replace: true });
    }

    function getUser (){
        if (curUser === null) {return ""}
        const email = curUser.email;
        const user = email.split("@")[0];
        return user;
    }

    function handleAdd (event){
        event.preventDefault();
        const title = (event.target.elements.titlein.value).trim();
        const desc = (event.target.elements.descin.value).trim();
        console.log(title, desc);

        setCardList(c => [...c, {id: Date.now(), title:title, desc:desc}]);
        setIsAdding(false);
    }

    const handleDelete = (id) => {
        const updatedCardList = cardList.filter((card) => card.id !== id);
        setCardList(updatedCardList);
    }

    const vals = {}

    return (
        <div className="flex flex-col h-screen">
            <header>
                <div className="flex items-center justify-between h-12 bg-blue-500 text-white px-4">
                    <div className="font-bold">Logo</div>
                    <div className="flex gap-2 font-sans cursor-pointer">
                        <span className="text-lg transition-transform duration-200 hover:scale-110 hover:text-lime-300">Inbox</span>
                        <span className="text-lg transition-transform duration-200 hover:scale-110 hover:text-lime-300">Profile</span>
                        <span className="text-lg transition-transform duration-200 hover:scale-110 hover:text-lime-300">Settings</span>
                    </div>
                    <span>
                            <button className="text-gray-950 bg-brand border border-blue-400 rounded-lg bg-blue-300 hover:bg-blue-400 cursor-pointer font-medium leading-5 rounded-base text-pxs px-4 py-2.5 scale-75"
                                onClick={handleLogOut}>
                                Log out
                            </button>
                    </span>
                </div>
                <div className="flex items-center justify-center text-white text-xl font-bold bg-blue-500">{`Welcome ${getUser()}`}</div>
                <div className="flex items-center justify-between h-8 bg-blue-500 text-white px-4">
                    {curUser?.permissions === "admin" &&
                        <button className="text-gray-950 bg-brand border border-blue-400 rounded-lg bg-blue-300 hover:bg-blue-400 cursor-pointer font-medium leading-5 rounded-base text-pxs px-4 py-2.5 scale-75"
                        onClick={() => setIsAdding(!isAdding)}>
                        Add Item
                        </button>
                    }
                </div>
            </header>

            <main className="bg-blue-500 flex-1">
                <div className="grid grid-cols-2 md:grid-cols-3 p-6 gap-4">
                    {cardList.map(card => <Card key={card.id} id={card.id} delete={handleDelete} title={card.title} desc={card.desc} role={curUser?.permissions}/>)}
                </div>
                {isAdding && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label htmlFor="titlein" className="block text-sm font-medium">Title:</label> 
                                <input id="titlein" type="text" required minLength="1" pattern=".*\S.*" className="mt-1 w-full rounded-md border p-2"/>
                            </div>
                            <div>
                                <label htmlFor="descin" className="block text-sm font-medium">Description:</label> 
                                <input id="descin" type="text" className="mt-1 w-full rounded-md border p-2"/>
                            </div>
                            <div>
                            <input type="submit" id="add-submit" value="Add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
                            </div>
                        </form>
                    </div>
                )}
            </main>

        </div>
    );
}