import React from 'react'

function CustomInput({ currencyAmount, currencyType, arrTypes, changeAmount, changeType }) {
    const sortedTypes = [...arrTypes].sort((a,b) => a > b ? 1: -1)
    
    return (
        <div className='customInput'>
            <input type='number' value={currencyAmount} onChange={e => changeAmount(e.target.value)}/>
            <select value={currencyType} onChange={e => changeType(e.target.value)}>
                {sortedTypes.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
        </div>
    )
}

export default CustomInput