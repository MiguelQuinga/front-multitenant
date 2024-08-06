"use client"
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

const CreateKpi = () => {
  const router = useRouter();
  let params = useParams();
  console.log('params: ', params)
  //const { idemployee, idtask } = router.query; // Accede a los parámetros de la URL

  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [timeUnit, setTimeUnit] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el cuerpo de la solicitud
    const kpiData = {
      title,
      target,
      timeUnit,
      idemployee,
      idtask,
    };

    // Enviar los datos al backend
    const response = await fetch('/api/kpi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(kpiData),
    });

    if (response.ok) {
      alert('KPI creado exitosamente');
      // Redirigir o realizar otras acciones
    } else {
      alert('Error al crear el KPI');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-6 animated-gradient">
      <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Crear KPI para Tarea</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Título del KPI</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Objetivo (Target)</label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Unidad de Tiempo</label>
            <input
              type="number"
              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Crear KPI
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateKpi;
