"use client";

import { useState } from 'react';


export default function Additem() {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Item added:
    - Name: ${itemName}
    - Category: ${category}
    - Price: ${price}
    - Quantity: ${quantity}`);
    
    // Reset form
    setItemName('');
    setCategory('');
    setPrice('');
    setQuantity('');

    try{
      const res = await fetch("http://localhost:3000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: itemName,
          Category: category,
          Quantity: quantity,
          Price: price,
        }),
        
      })
    }catch (error) {
      console.log(error);
    }
    if (res.ok) {
      alert("Item added successfully!");
    }
    else {
      alert("Failed to add item.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Add New Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-gray-700">Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            placeholder="Enter item name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Groceries">Groceries</option>
            <option value="Stationery">Stationery</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Price (LKR)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            placeholder="Enter price"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            placeholder="Enter quantity"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
