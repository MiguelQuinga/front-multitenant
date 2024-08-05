"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './employes.css';

export default function TenantEmployees({ params }) { //registrar un empleado dado un tenant
    const [paramCompnay, setParamCompnay] = useState(params.idtenant);
    const { register, hadleSubmit, control } = useForm();

    const employeeRegister = async () => {
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

    return(<>
        <div className="bg-blue-600 flex items-center justify-center min-h-screen flex-col">
            <div className='container'>
                <p>Welcome to: {paramCompnay}</p>
                <form>
                    <button> Append New Input</button>
                    <div>
                        <input type="text" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </>)
}