import React from 'react'
import Pet from './Pet'

class PetBrowser extends React.Component {
  generatePet = () => {
    return this.props.pets.map( pet => {
      console.log(pet)
      return <Pet key={pet.id} pet={pet} onAdoptPet={this.props.onAdoptPet} isAdopted={pet.isAdopted} />
    })
  }

  render() {
    return (
    <div className="ui cards">
      {this.generatePet()}
    </div>
    )
  }
}

export default PetBrowser
