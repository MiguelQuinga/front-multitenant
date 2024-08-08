"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function CreateKpiForm() {
    const router = useRouter();
    let params = useParams();
    console.log('params: ', params)
    console.log('params.idTask: ', params.IdTask)
    console.log('params.idEmployee: ', params.idEmployee)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-6 animated-gradient">
                <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}`} className="absolute top-4 left-4 bg-white bg-opacity-50 hover:bg-opacity-70 text-black font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                    ⬅️ Back
                </Link>

                <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-lg">
                    <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Elige el tipo de pregunta</h1>
                    <div className='w-full flex space-x-3'>
                        <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createKPI`}
                            className="w-full py-3 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center"
                        >
                            Generación dropdown de criterios de evaluación
                        </Link>

                        <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createKPI`}
                            className="w-full py-3 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center"
                        >
                            Métricas y unidad de tiempo
                        </Link>

                        <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createKPI`}
                            className="w-full py-3 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center"
                        >
                            Preguntas de Si/No
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}