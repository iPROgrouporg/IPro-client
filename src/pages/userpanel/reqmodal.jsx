import React from "react";

const RequestModal = ({ order, onClose }) => {
    console.log(order);
    
    return (
        <div className="absolute top-20  z-50 flex items-center  left-96 justify-center ">
            <div className=" text-white  p-8 rounded-xl bg-[#323232] w-full h-full animate-fade-in">

                <h2 className="text-gray-600">
                    <button className="font-medium text-2xl text-gray-300" onClick={onClose}>
                    Orders list
                    </button> <span className="text-white text-xl">/</span>
                    <span className="text-white font-medium text-2xl">Order page</span>
                </h2>

                <div className="mt-6 bg-[#292D32] p-6 rounded-xl ">
                    <h1 className="text-2xl font-bold mb-4 border-b-2 border-gray-500 pb-2">
                        Order number: {order.id}
                    </h1>

                    <div className="grid grid-cols-2 gap-4 text-lg">
                        <p className="text-gray-400">Status:</p>
                        <p className="font-bold">{order.status}</p>

                        <p className="text-gray-400">Company name:</p>
                        <p className="font-bold">{order.companyname}</p>

                        <p className="text-gray-400">Service type:</p>
                        <p className="font-bold">{order.service}</p>

                        <p className="text-gray-400">Date sent:</p>
                        <p className="font-bold">{order.date}</p>

                        <p className="text-gray-400">Date update:</p>
                        <p className="font-bold">{order.updated}</p>

                        <p className="text-gray-400">Deadline:</p>
                        <p className="font-bold">{order.deadline}</p>

                        <p className="text-gray-400">Requested amount:</p>
                        <p className="font-bold">{order.amount}</p>

                        <p className="text-gray-400">Link for example:</p>
                        <a href={order.exampleLink} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                           {order.link}
                        </a>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-gray-400">Other description</h3>
                        <p className="text-sm text-white">{order.description}</p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default RequestModal;
