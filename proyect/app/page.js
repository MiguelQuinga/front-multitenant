"use client"
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
  const [idenviar, setIdenviar] = useState('');
  const [resspuesta, setResspuesta] = useState('valor inicial');


  const pruebaMultenant = async () => {
    try {
      // Obtener usuarios de empresa_a
      const responseA = await fetch(`http://localhost:3001/empresa_a/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!responseA.ok) {
        throw new Error(`HTTP error! Status: ${responseA.status}`);
      }
  
      const dataA = await responseA.json();
      console.log("Usuarios de empresa A:", dataA);
  
      // Obtener usuarios de empresa_b
      const responseB = await fetch(`http://localhost:3001/empresa_b/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!responseB.ok) {
        throw new Error(`HTTP error! Status: ${responseB.status}`);
      }
  
      const dataB = await responseB.json();
      console.log("Usuarios de empresa B:", dataB);
  
      // Puedes hacer llamadas similares para obtener kpis y tasks de cada empresa
      // Ejemplo:
      // const responseKpiA = await fetch(`http://localhost:3001/empresa_a/kpis`);
      // const responseKpiB = await fetch(`http://localhost:3001/empresa_b/kpis`);
      // const responseTaskA = await fetch(`http://localhost:3001/empresa_a/tasks`);
      // const responseTaskB = await fetch(`http://localhost:3001/empresa_b/tasks`);
  
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  
  


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-[30px]">Pruebas para multi-tenant</div>
      <div className="bg-green-200 p-5 flex flex-col">
        <p>campo 1: id</p>
        <input value={idenviar} onChange={setIdenviar} type="text" className="" />
        <button onClick={() => { pruebaMultenant() }} className="bg-green-300">
          enviar
        </button>
      </div><br />

      <div className="bg-green-500 p-5">
        <p>respuesta: {resspuesta}</p>
      </div>
    </main>
  );
}
