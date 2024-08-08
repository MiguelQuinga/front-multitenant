"use client"
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function CreateTaskLogs() {

    let params = useParams();
    console.log('params: ', params)

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            tasklogs: {
                additionalFields: [{ key: '', value: '', type: 'string' }],
            },
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tasklogs.additionalFields"
    });

    const onFormSubmit = async (data) => {
        const { additionalFields } = data.tasklogs;
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
            ...additionalData,
        };

        console.log("data send: ", formattedData);
        // Aquí puedes realizar la petición API con formattedData
        const response = await fetch(`http://localhost:3000/employees/${params.idEmployee}/task/${params.IdTask}/tasklogs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-tenant-id": params.idtenant, // Pasar el nombre de la empresa como x-tenant-id
            },
            body: JSON.stringify(
                formattedData
            ),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const dataResponse = await response.json();
        console.log("respuesta: ", dataResponse);
        alert("TaskLogs Successfully Registered")
    }

    return (<>
        <div className="homepage flex items-center justify-center min-h-screen p-8">
            <Link href="/companies" className="absolute top-4 left-4 bg-white bg-opacity-50 hover:bg-opacity-70 text-black font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                ⬅️ Back
            </Link>
            <div className="w-full max-w-2xl bg-white bg-opacity-80 p-8 rounded-lg shadow-lg backdrop-blur-md">
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                    <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">Register TaskLog</h2>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700 ">Additional Fields</label>
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex flex-col space-y-2 mb-4 border-t border-gray-200 pt-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Field Key"
                                        className="text-black block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        {...register(`tasklogs.additionalFields.${index}.key`)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Field Value"
                                        className="text-black block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        {...register(`tasklogs.additionalFields.${index}.value`)}
                                    />
                                </div>
                                <div>
                                    <select
                                        className="text-black block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        {...register(`tasklogs.additionalFields.${index}.type`)}
                                    >
                                        <option value="string">String</option>
                                        <option value="number">Number</option>
                                        <option value="boolean">Boolean</option>
                                        <option value="date">Date</option>
                                    </select>
                                </div>
                                <button
                                    type="button"
                                    className="self-end px-4 py-2 mt-2 text-sm text-white bg-red-500 rounded-full hover:bg-red-600"
                                    onClick={() => remove(index)}
                                >
                                    Remove
                                </button>
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