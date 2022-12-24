import React from 'react'

const StackedButtonsGroup = ({ buttonArray }) => {
    return (
        <>
            <div className='flex flex-col-reverse gap-1 h-[150px] fixed bottom-4 right-4'>
                {buttonArray.map(({ type, name, icon, handleClick, color }) => (
                    <button
                        key={name}
                        className={`p-2 rounded-full text-white drop-shadow-2xl
                        hover:animate-spin hover:drop-shadow-none ${color}`}
                        type={type}
                        onClick={handleClick}>
                        {icon}
                    </button>
                ))}
            </div>
        </>
    )
}

export default StackedButtonsGroup