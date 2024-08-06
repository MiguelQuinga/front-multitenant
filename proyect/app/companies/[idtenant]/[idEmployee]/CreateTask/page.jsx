"use client"
import React, { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Link from 'next/link';
import './tasks.css'

export default function AssignTasks({ params }) { //registrar un empleado dado un tenant
    const [idEmproee, setIdEmproee] = useState(params.idemployee);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            task: {
                title: '',
                priority: '',
                startDate: '',
                endDate: '',
                concurrence: '',
                state: '',
                additionalFields: [{ key: '', value: '', type: 'string' }],
            },
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "task.additionalFields"
    });


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

    const onFormSubmit = (data) => {
        const { title, priority, startDate, endDate, concurrence, state, additionalFields } = data.task;
        const additionalData = additionalFields.reduce((acc, field) => {
            if (field.key && field.value) {
                switch (field.type) {
                    case 'number':
                        acc[field.key] = parseFloat(field.value);
                        break;
                    case 'boolean':
                        acc[field.key] = field.value === 'true';
                        break;
                    case 'date':
                        acc[field.key] = new Date(field.value);
                        break;
                    default:
                        acc[field.key] = field.value;
                }
            }
            return acc;
        }, {});

        const formattedData = {
            title,
            priority,
            startDate,
            endDate,
            concurrence,
            state,
            ...additionalData,
        };

        console.log(formattedData);
        // Aquí puedes realizar la petición API con formattedData
    }

    return (<>
        <div className="animated-gradient flex flex-col items-center justify-center min-h-screen p-8">

            <Link href="/companies/employee-list" className="absolute top-4 left-4 bg-white bg-opacity-50 hover:bg-opacity-70 text-black font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                ⬅️ Back
            </Link>

            <div className="w-full max-w-2xl bg-white bg-opacity-80 p-8 rounded-lg shadow-lg backdrop-blur-md">
                <div className='my-2 flex flex-col items-center'>
                    <h2 className='text-center text-[32px] text-black'>Assign tasks</h2>
                    <p className='text-[24px] text-rose-950'>EmployeeId: {idEmproee}</p>
                </div>

                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                placeholder="Title"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                {...register("task.title", { required: "Title is required" })}
                            />
                            {errors.task?.title && <p className="mt-1 text-sm text-red-500">{errors.task.title.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Priority</label>
                            <input
                                type="text"
                                placeholder="Priority"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                {...register("task.priority", { required: "Priority is required" })}
                            />
                            {errors.task?.priority && <p className="mt-1 text-sm text-red-500">{errors.task.priority.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="text"
                                placeholder="Start Date"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                {...register("task.startDate", { required: "Start Date is required" })}
                            />
                            {errors.task?.startDate && <p className="mt-1 text-sm text-red-500">{errors.task.startDate.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="text"
                                placeholder="End Date"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                {...register("task.endDate", { required: "End Date is required" })}
                            />
                            {errors.task?.endDate && <p className="mt-1 text-sm text-red-500">{errors.task.endDate.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Concurrence</label>
                            <input
                                type="text"
                                placeholder="Concurrence"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                {...register("task.concurrence", { required: "Concurrence is required" })}
                            />
                            {errors.task?.concurrence && <p className="mt-1 text-sm text-red-500">{errors.task.concurrence.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">State</label>
                            <input
                                type="text"
                                placeholder="State"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                {...register("task.state", { required: "State is required" })}
                            />
                            {errors.task?.state && <p className="mt-1 text-sm text-red-500">{errors.task.state.message}</p>}
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <label className="block text-sm font-medium text-gray-700 ">Additional Fields</label>
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex flex-col space-y-2 mb-4 border-t border-gray-200 pt-4">
                                <input
                                    type="text"
                                    placeholder="Additional Field Key"
                                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    {...register(`task.additionalFields.${index}.key`)}
                                />
                                <input
                                    type="text"
                                    placeholder="Additional Field Value"
                                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    {...register(`task.additionalFields.${index}.value`)}
                                />
                                <select
                                    className="text-black block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    {...register(`task.additionalFields.${index}.type`)}
                                >
                                    <option value="string">String</option>
                                    <option value="number">Number</option>
                                    <option value="boolean">Boolean</option>
                                    <option value="date">Date</option>
                                </select>
                                <button type="button"
                                    className="self-end px-4 py-2 mt-2 text-sm text-white bg-red-500 rounded-full hover:bg-red-600"
                                    onClick={() => remove(index)}>Remove</button>
                            </div>
                        ))}

                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="px-4 py-2 text-sm text-white bg-green-500 rounded-full hover:bg-green-600"
                                onClick={() => append({ key: '', value: '', type: 'string' })}
                            >
                                Add Field
                            </button>
                        </div>

                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>)
}