import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import service from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() =>{
    service.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const result = filter === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addnewName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const nameExisted = persons.some(person => person.name === newName)
    const existingPerson = persons.find(p => p.name === newName)
    if(nameExisted){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        service.update(existingPerson.id, newPerson).then(response => {
          setPersons(persons.map(p => p.id !== existingPerson.id ? p : response.data))
        })
      }
      return
    }
    service.create(newPerson).then(response => {
      console.log(response)
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      service.remove(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>add a new</h2>
      <PersonForm 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addnewName={addnewName}
      />
      <h2>Numbers</h2>
      <Persons result={result} deletePerson={deletePerson}/>
    </div>
  )
}

export default App