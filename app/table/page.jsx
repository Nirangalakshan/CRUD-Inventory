"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function InventoryTable() {
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch("/api/items", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error(error);
        setItems([]);
      }
    };

    getItems();
  }, []);

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`/api/items?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete item");
      const updatedItems = items.filter((item) => item._id !== id);
      setItems(updatedItems); // update UI immediately
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overflow-x-auto px-4 py-6">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100 text-black text-left">
          <tr>
            <th className="py-3 px-4 border-b">#</th>
            <th className="py-3 px-4 border-b">Item Name</th>
            <th className="py-3 px-4 border-b">Category</th>
            <th className="py-3 px-4 border-b">Quantity</th>
            <th className="py-3 px-4 border-b">Price (Rs)</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((t, index) => (
            <tr key={t._id} className="hover:bg-gray-50 transition duration-200">
              <td className="py-3 px-4 border-b text-cyan-900">{index + 1}</td>
              <td className="py-3 px-4 border-b text-cyan-900">{t.Name}</td>
              <td className="py-3 px-4 border-b text-cyan-900">{t.Category}</td>
              <td className="py-3 px-4 border-b text-cyan-900">{t.Quantity}</td>
              <td className="py-3 px-4 border-b text-cyan-900">{t.Price}</td>
              <td className="py-3 px-4 border-b space-x-2">
                <button onClick={() => router.push(`/updateitem?id=${t._id}`)} className="text-blue-500 hover:underline">Edit</button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => deleteItem(t._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
