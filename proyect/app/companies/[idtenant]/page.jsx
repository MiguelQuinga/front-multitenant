"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './employes.css';

export default function TenantEmployees({ params }) {

    const { register, hadleSubmit, control } = useForm();

    return(<>
        <div className="bg-blue-600 flex items-center justify-center min-h-screen flex-col">
            <div className='container'>
                <form>
                    <button> Append New Input</button>
                    <div>
                        <input type="text" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </>)
}