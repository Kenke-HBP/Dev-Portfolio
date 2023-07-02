import React, { useState } from "react";
import './animals.css';

const AnimalCard = (props) => {
  const { name, species, description, image, onDelete } = props;
  const [expanded, setExpanded] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const toggleImage = () => {
    setShowImage(!showImage);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="animal-card">
      <h3>{name}</h3>
      <p>{species}</p>
      <p>
        {expanded ? description : `${description.slice(0, 100)}...`}
      </p>
      <div className="AnimalCard">
      {expanded ? (
        <button onClick={toggleDescription}>Show Less</button>
      ) : (
        <button onClick={toggleDescription}>Show More</button>
      )}
      {showImage ? (
        <button onClick={toggleImage}>Hide Image</button>
      ) : (
        <button onClick={toggleImage}>Show Image</button>
      )}
      <button onClick={handleDelete}>Delete</button>
      </div>
      {showImage && <img src={image} alt={name} />}
    </div>
  );
  
};

export default AnimalCard;