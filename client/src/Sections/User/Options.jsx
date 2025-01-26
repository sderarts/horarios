import React from 'react'

function Options() {
    return (
        <div className='w-full bg-amber-400 '>
            <div className='flex p-12 bg-white rounded-sm justify-center w-1/3 h-full '>
                <div className='flex flex-col space-y-5'>
                    <button
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded-lg w-72 h-16 font-semibold text-lg"
                    >
                        Quiero inscribir asignaturas
                    </button>
                    <div className='flex flex-col space-y-4'>
                        <button
                            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded-lg font-medium text-sm"
                        >
                            Quiero cambiar sección
                        </button>
                        <button
                            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded-lg font-medium text-sm"
                        >
                            Quiero cambiar asignaturas
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Options