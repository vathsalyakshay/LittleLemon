import React from "react";
import Card from "../components/Card";
import "./Menu.css";

const Menu = () => {
  const menuItems = {
    appetizers: [
      {
        id: 1,
        name: "Greek Salad",
        price: "12.99",
        description:
          "Crispy lettuce, peppers, olives and Chicago style feta cheese, garnished with crunchy garlic croutons.",
        image: "/images/greek-salad.jpg",
      },
      {
        id: 2,
        name: "Bruschetta",
        price: "5.99",
        description:
          "Grilled bread smeared with garlic and seasoned with salt and olive oil.",
        image: "/images/bruschetta.jpg",
      },
      {
        id: 3,
        name: "Hummus & Pita",
        price: "8.99",
        description:
          "Creamy chickpea hummus served with warm pita bread and olive oil.",
        image: "/images/hummus.jpg",
      },
    ],
    desserts: [
      {
        id: 7,
        name: "Lemon Dessert",
        price: "5.00",
        description:
          "Grandma's recipe with authentic Mediterranean ingredients.",
        image: "/images/lemon-dessert.jpg",
      },
      {
        id: 8,
        name: "Baklava",
        price: "6.99",
        description: "Layers of phyllo pastry with honey and nuts.",
        image: "/images/menu/baklava.webp",
      },
      {
        id: 9,
        name: "Greek Tea",
        price: "4.99",
        description: "Traditional Greek mountain tea, served hot.",
        image: "/images/menu/tea.jpeg",
      },
    ],
  };

  return (
    <main className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Discover our selection of authentic Mediterranean dishes</p>
      </div>

      <section className="menu-section">
        <div className="menu-container">
          <h2>Appetizers</h2>
          <div className="menu-grid">
            {menuItems.appetizers.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                title={item.name}
                price={item.price}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="menu-section">
        <div className="menu-container">
          <h2>Desserts</h2>
          <div className="menu-grid">
            {menuItems.desserts.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                title={item.name}
                price={item.price}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Menu;
