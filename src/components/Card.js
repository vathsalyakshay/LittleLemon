import React from "react";
import "./Card.css";

const Card = ({
  image,
  title,
  price,
  description,
  badge,
  deliveryOption,
  children,
}) => {
  return (
    <article className="card">
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
          {badge && <span className="card-badge">{badge}</span>}
        </div>
      )}
      <div className="card-content">
        {(title || price) && (
          <div className="card-header">
            {title && <h3>{title}</h3>}
            {price && <span className="card-price">${price}</span>}
          </div>
        )}
        {description && <p className="card-description">{description}</p>}
        {deliveryOption && (
          <div className="delivery-badge">
            <span className="delivery-icon">🚚</span>
            <span>Order for Delivery</span>
          </div>
        )}
        {children}
      </div>
    </article>
  );
};

export default Card;
