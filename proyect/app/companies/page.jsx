"use client"
import React from 'react'
import { useEffect, useState } from "react";

function Companies() {

    const [companyRegister, setCompanyRegister] = useState('');
    const [idCompanyRegister, setIdCompanyRegister] = useState('');

    const pruebaMultenant = async () => {
        try {
            // Obtener usuarios de empresa_a
            const responseA = await fetch(`http://localhost:3000/tenants`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    companyName: companyRegister,
                    tenantId: idCompanyRegister
                }),
            });

            if (!responseA.ok) {
                throw new Error(`HTTP error! Status: ${responseA.status}`);
            }

            const data = await responseA.json();
            console.log("respuesta:", data);
            alert("Registro de company exitoso")

        } catch (error) {
            console.error("Fetch error:", error);
        }
    };


    return (
        <>
            <div className="bg-blue-600 flex items-center justify-center min-h-screen flex-col">
                <div className="flex flex-col items-center border-r-gray-800 border-gray-800 border-2 p-4 bg-slate-200 text-black">
                    <p className='mb-2 font-semibold'>REGISTER COMPANY</p>
                    <div className='flex flex-col items-center'>
                        <div>
                            <p>Company Name: </p>
                            <input placeholder='CompanyExample'
                                className='w-[90%]'
                                value={companyRegister}
                                onChange={e => {
                                    // Limitar la longitud del valor a 400 caracteres
                                    if (e.target.value.length <= 90) {
                                        setCompanyRegister(e.target.value)
                                    }
                                }} />
                        </div>
                        <div>
                            <p>Id Company: </p>
                            <input placeholder='CompanyExample'
                                className='w-[90%]'
                                value={idCompanyRegister}
                                onChange={e => {
                                    // Limitar la longitud del valor a 400 caracteres
                                    if (e.target.value.length <= 90) {
                                        setIdCompanyRegister(e.target.value)
                                    }
                                }} />
                        </div>
                    </div>
                </div>

                <div className='flex space-x-16'>
                    <button className='mt-5 py-1 px-5 text-[14px] rounded-full text-center bg-red-300 hover:bg-red-400 text-black'>
                        CANCEL
                    </button>

                    <button onClick={() => { pruebaMultenant() }} className="mt-5 py-1 px-5 text-[14px] rounded-full text-center bg-green-300 hover:bg-green-500 text-black">
                        enviar
                    </button>

                    <button className='mt-5 py-1 px-5 text-[14px] rounded-full text-center bg-[#65579d] hover:bg-[#6650bc] text-white'>
                        NEXT
                    </button>
                </div>

            </div>
        </>
    )
}

export default Companies