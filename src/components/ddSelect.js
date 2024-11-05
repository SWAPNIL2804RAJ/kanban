import React from 'react';

export default function DDSelect() {
  return (
    <div>
      <label htmlFor="pet-select">Choose a pet:</label>
      <select name="pets" id="pet-select">
        {['Dog', 'Cat', 'Hamster', 'Parrot', 'Spider', 'Goldfish'].map(pet => (
          <option key={pet.toLowerCase()} value={pet.toLowerCase()}>
            {pet}
          </option>
        ))}
      </select>
    </div>
  );
}
