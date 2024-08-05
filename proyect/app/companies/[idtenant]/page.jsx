"use client"
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import './employes.css';

export default function TenantEmployees({ params }) {

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            employee: {
                name: '',
                department: '',
                work_position: '',
                additionalFields: [{ key: '', value: '', type: 'string' }],
            },
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "employee.additionalFields"
    });

    const onFormSubmit = (data) => {
        const { name, department, work_position, additionalFields } = data.employee;
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
            name,
            department,
            work_position,
            ...additionalData,
        };

        console.log(formattedData);
        // Aquí puedes realizar la petición API con formattedData
    }

    return (
        <div className="bg-blue-600 flex items-center justify-center min-h-screen flex-col">
            <div className='container'>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="inputs">
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                {...register("employee.name", { required: "Name is required" })}
                            />
                            {errors.employee?.name && <p>{errors.employee.name.message}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Department"
                                {...register("employee.department", { required: "Department is required" })}
                            />
                            {errors.employee?.department && <p>{errors.employee.department.message}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Work Position"
                                {...register("employee.work_position", { required: "Work Position is required" })}
                            />
                            {errors.employee?.work_position && <p>{errors.employee.work_position.message}</p>}
                        </div>

                        <button type="button" onClick={() => append({ key: '', value: '', type: 'string' })}>
                            Append New Input
                        </button>

                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <input
                                    type="text"
                                    placeholder="Additional Field Key"
                                    {...register(`employee.additionalFields.${index}.key`)}
                                />
                                <input
                                    type="text"
                                    placeholder="Additional Field Value"
                                    {...register(`employee.additionalFields.${index}.value`)}
                                />
                                <select className='text-black'
                                    {...register(`employee.additionalFields.${index}.type`)}
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
    )
}
