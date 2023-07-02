import React, { useState } from "react";
import AnimalCard from "./AnimalCard";
import data from "./data.json";
import './animals.css';

const Animals = () => {
  const [animalData, setAnimalData] = useState(data);

  const handleDelete = (id) => {
    const updatedData = animalData.filter((animal) => animal.id !== id);
    setAnimalData(updatedData);
  };

  return (
    <div className="animals-container">
      {animalData.map((animal) => (
        <AnimalCard
          key={animal.id}
          name={animal.name}
          species={animal.species}
          description={animal.description}
          image={animal.image}
          onDelete={() => handleDelete(animal.id)}
        />
      ))}
    </div>
  );
};

export default Animals;

