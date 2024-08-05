"use client"
import React, { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
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
        <div className="bg-blue-600 flex items-center min-h-screen flex-col">
            <div className='mt-10'>
                <h2 className='text-center text-[32px] text-rose-900'>Assign tasks</h2>
                <p className='text-[24px] text-rose-950'>User: {idEmproee}</p>
            </div>

            <div className='container'>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="inputs">
                        <div>
                            <input
                                type="text"
                                placeholder="Title"
                                {...register("task.title", { required: "Title is required" })}
                            />
                            {errors.task?.title && <p>{errors.task.title.message}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Priority"
                                {...register("task.priority", { required: "Priority is required" })}
                            />
                            {errors.task?.priority && <p>{errors.task.priority.message}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Start Date"
                                {...register("task.startDate", { required: "Start Date is required" })}
                            />
                            {errors.task?.startDate && <p>{errors.task.startDate.message}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="End Date"
                                {...register("task.endDate", { required: "End Date is required" })}
                            />
                            {errors.task?.endDate && <p>{errors.task.endDate.message}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Concurrence"
                                {...register("task.concurrence", { required: "Concurrence is required" })}
                            />
                            {errors.task?.concurrence && <p>{errors.task.concurrence.message}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Department"
                                {...register("task.state", { required: "State is required" })}
                            />
                            {errors.task?.state && <p>{errors.task.state.message}</p>}
                        </div>

                        <button type="button" onClick={() => append({ key: '', value: '', type: 'string' })}>
                            Append New Input
                        </button>

                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <input
                                    type="text"
                                    placeholder="Additional Field Key"
                                    {...register(`task.additionalFields.${index}.key`)}
                                />
                                <input
                                    type="text"
                                    placeholder="Additional Field Value"
                                    {...register(`task.additionalFields.${index}.value`)}
                                />
                                <select className='text-black'
                                    {...register(`task.additionalFields.${index}.type`)}
                                >
                                    <option value="string">String</option>
                                    <option value="number">Number</option>
                                    <option value="boolean">Boolean</option>
                                    <option value="date">Date</option>
                                </select>
                                <button type="button" onClick={() => remove(index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </>)
}