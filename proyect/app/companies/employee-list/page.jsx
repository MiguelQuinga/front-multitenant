"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './style.css'

export default function EmployeeList() { //registrar un empleado dado un tenant
    const [tenantName, setTenantName] = useState('');
    const [employees, setEmployees] = useState([]);
    const router = useRouter();


    const getEmployeeList = async () => {
        try {
            // Obtener usuarios de empresa con x-tenant-id
            const response = await fetch(`http://localhost:3000/employees`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-tenant-id": tenantName, // Pasar el nombre de la empresa como x-tenant-id
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setEmployees(data);
            console.log("respuesta:", data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const getTableHeaders = () => {
        const allKeys = employees.reduce((keys, employee) => {
            return [...keys, ...Object.keys(employee)];
        }, []);

        // Exclude 'tasks' and 'Actions' since it will be manually added
        return [...new Set(allKeys)].filter((key) => key !== 'tasks' && key !== 'tenantId');
    };

    const tableHeaders = getTableHeaders();
    const hasEmployees = employees.length > 0;

    const handleButtonClick = (id) => {
        router.push(`/companies/employee-list/${id}`);
    };
    //<div className="bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center min-h-screen p-4 flex-col">
    return (<>
        <div className="animated-gradient flex items-center justify-center min-h-screen p-4 flex-col">
            <Link href="/companies" className="absolute top-4 left-4 bg-white bg-opacity-50 hover:bg-opacity-70 text-black font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                ⬅️ Back
            </Link>
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md bg-opacity-70">
                <div className="mb-4">
                    <label htmlFor="tenantName" className="block text-sm font-medium text-gray-700 mb-2">
                        Tenant Name:
                    </label>
                    <input
                        id="tenantName"
                        type="text"
                        placeholder="CompanyExample"
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                        value={tenantName}
                        onChange={e => {
                            // Limitar la longitud del valor a 400 caracteres
                            if (e.target.value.length <= 90) {
                                setTenantName(e.target.value)
                            }
                        }}
                    />
                </div>
                <button
                    onClick={getEmployeeList}
                    className="w-full py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                    Listar Empleados
                </button>
            </div> <br />
            <Link href={`/companies/${tenantName}`}
                className=" py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-[200px] text-center"
            >
                Crear Empleado
            </Link><br />
            {/*---------- tabla dinámica para empleados con campos variables ----------*/}
            <div className="flex justify-center">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                {tableHeaders.map((header) => (
                                    <th key={header} className="py-3 px-6 text-left uppercase tracking-wider">
                                        {header.replace(/_/g, ' ')}
                                    </th>
                                ))}
                                {hasEmployees && (
                                    <th className="py-3 px-6 text-left uppercase tracking-wider">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className='text-black'>
                            {employees.map((employee, index) => (
                                <tr
                                    key={employee._id}
                                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                                >
                                    {tableHeaders.map((header) => (
                                        <td key={header} className="py-3 px-6">
                                            {typeof employee[header] === 'object'
                                                ? JSON.stringify(employee[header], null, 2)
                                                : employee[header] ?? 'N/A'}
                                        </td>
                                    ))}
                                    <td className="py-3 px-6">
                                        <button
                                            onClick={() => handleButtonClick(employee._id)}
                                            className="py-1 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                                        >
                                            Task
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </>)
}