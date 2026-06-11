import { useState } from 'react'

const Persons = ({ result, deletePerson }) => {
    return (
        <>
        {result.map(person =>
        <div>
            <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(personn)}>delete</button></p>
           
        </div>
        )}
        </>
    )
}

export default Persons