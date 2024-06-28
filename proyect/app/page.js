"use client"
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
  const [idenviar, setIdenviar] = useState('');
  const [resspuesta, setResspuesta] = useState('valor inicial');


  const pruebaMultenant = async () => {
    try {
      // Calcula el número total de empresas y productos registrados ese día
      const response = await fetch(`http://localhost:3001`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data; ", data);

    } catch (error) {
      console.error("Fetch error:", error);
    }

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-[30px]">Pruebas para multi-tenant</div>
      <div className="bg-green-200 p-5 flex flex-col">
        <p>campo 1: id</p>
        <input value={idenviar} onChange={setIdenviar} type="text" className="" />
        <button  onClick={() => { pruebaMultenant()}} className="bg-green-300">
          enviar
        </button>
      </div><br />

      <div className="bg-green-500 p-5">
        <p>respuesta: {resspuesta}</p>
      </div>
    </main>
  );
}
