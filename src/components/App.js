import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    let filterType = event.target.value
    this.setState({
      ...this.state.pets,
      ...this.state.filters.type = filterType
    })
  }

  onFindPetsClick = ()=> {
    if (this.state.filters.type === 'all') {
      fetch('/api/pets')
      .then(response => response.json())
      .then(pets => this.setState({
        pets: pets
      }))
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(response => response.json())
      .then(pets => this.setState({
        pets: pets
      }))
    }
  }

  // this version of onAdoptPet works, but it appends the updated pet to end of the list no matter where it was originally - not the best user experience
  // onAdoptPet = (petId) => {
  //   let updatedPet = this.state.pets.find(pet => pet.id === petId)
  //   updatedPet.isAdopted = true
  //   console.log(updatedPet)
  //   let otherPets = this.state.pets.filter(pet => pet.id !== updatedPet.id)
  //   otherPets.push(updatedPet)
  //   this.setState({
  //     pets: otherPets
  //   }) 
  // }

  // this version of onAdoptPet uses .map(), which returns a new array with all of the same elements in the same order, only modified
  // it also uses the spread operator (...) to destructure the pet object first, and then overwrite the value of the isAdopted key
  onAdoptPet = (petId) => {
    console.log(petId)
    let newPets = this.state.pets.map(pet => {
      return pet.id === petId ? { ...pet, isAdopted: true } : pet
    })
    console.log(newPets)
    this.setState({
      pets: newPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
