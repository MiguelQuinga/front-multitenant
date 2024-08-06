"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreateKpi = () => {
  const router = useRouter();
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
    <div>
      <h1>Crear KPI para Tarea</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título del KPI:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Objetivo (Target):</label>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Unidad de Tiempo:</label>
          <input
            type="number"
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear KPI</button>
      </form>
    </div>
  );
};

export default CreateKpi;
