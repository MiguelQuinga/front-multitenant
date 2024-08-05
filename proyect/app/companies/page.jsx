import React from 'react'

function Companies(){
    return(
        <>
            <div className="bg-blue-600 flex items-center justify-center min-h-screen flex-col">
                <div className="flex flex-col items-center border-r-gray-800 border-gray-800 border-2 p-4 bg-slate-200 text-black">
                    <p className='mb-2 font-semibold'>REGISTER COMPANY</p>
                    <div className='flex flex-col items-center'>
                        <div>
                            <p>Company Name: </p>
                            <input placeholder='CompanyExample' className='w-[90%]'></input>
                        </div>
                        <div>
                            <p>Id Company: </p>
                            <input placeholder='companyIdExample' className='w-[90%]'></input>
                        </div>
                    </div>
                </div>

                <div className='flex space-x-16'>
                    <button className='mt-5 py-1 px-5 text-[14px] rounded-full text-center bg-red-300 hover:bg-red-400 text-black'>
                        CANCEL
                    </button>

                    <button className='mt-5 py-1 px-5 text-[14px] rounded-full text-center bg-[#65579d] hover:bg-[#6650bc] text-white'>
                        NEXT
                    </button>
                </div>
                
            </div>
        </>
    )
}

export default Companies