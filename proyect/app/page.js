"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from 'next/link';


export default function Home() {
  const [idenviar, setIdenviar] = useState('');
  const [resspuesta, setResspuesta] = useState('valor inicial');

  useEffect(() => {
    //pruebaMultenant().then(result => result).catch(error => console.log(error));
  }, []);

  const pruebaMultenant = async () => {
    try {
      // Obtener usuarios de empresa_a
      const responseA = await fetch(`localhost:3000/tenants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: "preubaMiguel",
          tenantId: "preubamiguel"
        }),
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
    <main className="animated-gradient flex min-h-screen items-center flex-col justify-center p-24">
            <Link href={`/companies`}
                className=" py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-[200px] text-center"
            >
                Companies
            </Link><br />
    </main>
  );
}
