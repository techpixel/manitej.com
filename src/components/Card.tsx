import React from "react";
import './card.css';

interface CardProps {
  title: string;
  body: string;
}

export const Card: React.FC<CardProps> = ({ title, body }) => {
  return (
    <div className="card">
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
};