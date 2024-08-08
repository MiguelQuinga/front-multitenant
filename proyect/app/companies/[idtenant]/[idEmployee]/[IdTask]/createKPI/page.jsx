"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function CreateKpi() {
  const router = useRouter();
  let params = useParams();
  console.log('params: ', params)
  console.log('params.idTask: ', params.IdTask)
  console.log('params.idEmployee: ', params.idEmployee)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [timeUnit, setTimeUnit] = useState('');
  const [additionalFields, setAdditionalFields] = useState([
    { type: 'string', name: '', value: '' }
  ]);

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, { type: 'string', name: '', value: '' }]);
  };

  const handleRemoveField = (index) => {
    setAdditionalFields(additionalFields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index, field, value) => {
    const newFields = additionalFields.slice();
    newFields[index][field] = value;
    setAdditionalFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timeUnitNumber = Number(timeUnit);
    // Crear el cuerpo de la solicitud
    const kpiData = {
      title,
      target,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      timeUnit: timeUnitNumber, // Ensure timeUnit is a number
      ...additionalFields.reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
      }, {}),
    };
    console.log('datos e enviar: ', kpiData)

    // Enviar los datos al backend
    const response = await fetch(`http://localhost:3000/employees/${params.idEmployee}/tasks/${params.IdTask}/kpis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-tenant-id": params.idtenant, //Pasar el id de la empresa como x-tenant-id
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
      <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}`} className="absolute top-4 left-4 bg-white bg-opacity-50 hover:bg-opacity-70 text-black font-semibold py-2 px-4 rounded-full shadow-md transition-all">
        ⬅️ Back
      </Link>

      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Crear KPI para Tarea</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Título del KPI</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Objetivo (Target)</label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Unidad de Tiempo</label>
            <input
              type="number"
              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-6">
            <p className='block text-sm font-medium text-gray-700 mb-2'>Rango de fechas:</p>
            <div className='w-full flex justify-between'>
              <div className='w-[220px]'>
                <p className='block text-sm font-medium text-gray-700 mb-2'>fecha de inicio:</p>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className='w-[220px]'>
                <p className='block text-sm font-medium text-gray-700 mb-2'>fecha de fin:</p>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Campos Adicionales</h2>
            {additionalFields.map((field, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <div className="mb-2 flex flex-col items-center space-y-4">
                  <select
                    value={field.type}
                    onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={field.name}
                    onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type={field.type === 'number' ? 'number' : 'text'}
                    placeholder="Valor"
                    value={field.value}
                    onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none bg-red-200 h-[30px] w-[30px] rounded flex items-center justify-center hover:bg-red-400"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
            <div className="text-right">
              <button
                type="button"
                onClick={handleAddField}
                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Añadir Campo
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Crear KPI
          </button>
        </form>
      </div>
    </div>
  );
}
