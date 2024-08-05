"use client"
import React, { useState, useEffect } from 'react';

export default function AssignTasks({ params }) { //registrar un empleado dado un tenant
    const [idEmproee, setIdEmproee] = useState(params.idemployee);

    const asignedTask = async () => {
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

        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    return (<>
        <div className="bg-blue-600 flex items-center min-h-screen flex-col">
            <div className='mt-10'>
                <h2 className='text-center text-[32px] text-rose-900'>Assign tasks</h2>
                <p className='text-[24px] text-rose-950'>User: {idEmproee}</p>
            </div>
        </div>
    </>)
}