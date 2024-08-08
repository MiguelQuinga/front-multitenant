"use client"
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function PageTaskListEmployee() {
    let params = useParams();
    console.log('params: ', params)
    const [tenantId, setTenantId] = useState(params.idtenant);
    const [employeeId, setEmployeeId] = useState(params.idEmployee);
    const [tasks, setTasks] = useState([]);
    const router = useRouter();

    const getTasksListEmployee = async () => {
        try {
            //Obtener tareas de empleados con x-tenant-id
            const response = await fetch(`http://localhost:3000/employees/${employeeId}/tasks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-tenant-id": tenantId, //Pasar el id de la empresa como x-tenant-id
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setTasks(data);
            console.log("Respuesta: ", data);
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };

    const getTableHeaders = () => {
        const allKeys = tasks.reduce((keys, task) => {
            return [...keys, ...Object.keys(task)];
        }, []);

        return [...new Set(allKeys)].filter((key) => key !== 'kpis' && key !== 'tasklogs');
    };

    const tableHeaders = getTableHeaders();
    const hasTasks = tasks.length > 0;

    const handleButtonClickKPI = (IdTask) => {
        router.push(`/companies/${params.idtenant}/${params.idEmployee}/${IdTask}`);
    };

    const handleButtonClickLogs = () => {
        router.push(`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createTaskLogs`);
    };

    const renderCellContent = (header, value) => {
        if (typeof value === 'boolean') {
            return value ? (
                <span className="text-green-500 font-bold">&#10003;</span>
            ) : (
                <span className="text-red-500 font-bold">&#10007;</span>
            );
        }

        return typeof value === 'object' ? JSON.stringify(value, null, 2) : value ?? 'N/A';
    };

    return (
        <div className="homepage flex items-center justify-center min-h-screen p-4 flex-col">
            <Link href="/companies/employee-list" className="absolute top-4 left-4 bg-white bg-opacity-50 hover:bg-opacity-70 text-black font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                ⬅️ Back
            </Link>

            <div className='mt-10'>
                <h2 className='text-center text-[32px] text-rose-900'>List tasks</h2>
                <p className='text-[24px] text-rose-950'>Employee: {employeeId}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md bg-opacity-70">
                <div className="mb-4">
                    <label htmlFor="tenantName" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name:
                    </label>
                    <input
                        id="tenantName"
                        type="text"
                        placeholder="CompanyExample"
                        className="text-black block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                        value={tenantId}
                        onChange={e => {
                            // Limitar la longitud del valor a 400 caracteres
                            if (e.target.value.length <= 90) {
                                setTenantId(e.target.value);
                            }
                        }}
                    />
                </div>
                <button
                    onClick={getTasksListEmployee}
                    className="w-full py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                    Listar Tasks-Employee
                </button>
            </div> <br />

            <Link href={`/companies/${params.idtenant}/${params.idEmployee}/CreateTask`}
                className="py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors w-[200px] text-center"
            >
                Asignar Tarea Empleado
            </Link><br />
            {/*---------- tabla dinámica para tasks con campos variables ----------*/}
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
                                {hasTasks && (
                                    <th className="py-3 px-6 text-left uppercase tracking-wider">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className='text-black'>
                            {tasks.map((task, index) => (
                                <tr
                                    key={task._id}
                                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                                >
                                    {tableHeaders.map((header) => (
                                        <td key={header} className="py-3 px-6">
                                            {renderCellContent(header, task[header])}
                                        </td>
                                    ))}
                                    <td className="py-3 px-2">
                                        <button
                                            onClick={() => handleButtonClickKPI(task._id)}
                                            className="py-1 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 mb-2"
                                        >
                                            Logs and KPIs
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}