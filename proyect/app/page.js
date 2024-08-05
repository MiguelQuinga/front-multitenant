"use client"
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
  const [idenviar, setIdenviar] = useState('');
  const [resspuesta, setResspuesta] = useState('valor inicial');
  
  useEffect(() => {
    pruebaMultenant().then(result => result).catch(error => console.log(error));
  }, []);

  const pruebaMultenant = async () => {
    try {
      // Obtener usuarios de empresa_a
      const responseA = await fetch(`http://localhost:3001/table-structure?schema=empresa_a&table=kpi`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!responseA.ok) {
        throw new Error(`HTTP error! Status: ${responseA.status}`);
      }

      const dataA = await responseA.json();
      console.log("elementos empresa A:", dataA);

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
