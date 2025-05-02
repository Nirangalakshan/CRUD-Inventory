'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EditItem() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(`/api/items/${id}`);
        const data = await res.json();
        const item = data.item;

        setName(item.Name);
        setCategory(item.Category);
        setQuantity(item.Quantity);
        setPrice(item.Price);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch item:', error);
      }
    }

    if (id) fetchItem();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newName: name,
          newCategory: category,
          newQuantity: quantity,
          newPrice: price,
        }),
      });

      if (res.ok) {
        alert('Item updated successfully!');
        router.push('/');
      } else {
        alert('Update failed');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  if (loading) return <div style={styles.loading}>Loading item...</div>;

  return (
    <div style={styles.container}>
      <h1 className="text-2xl font-bold mb-4" style={styles.title}>Edit Item</h1>
      <form onSubmit={handleUpdate} style={styles.form}>
        <label style={styles.label}>
          Name
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label style={styles.label}>
          Category
          <input
            style={styles.input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>

        <label style={styles.label}>
          Quantity
          <input
            style={styles.input}
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>

        <label style={styles.label}>
          Price
          <input
            style={styles.input}
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <button style={styles.button} type="submit">Update Item</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '4rem auto',
    padding: '2rem',
    borderRadius: '10px',
    background: '#f7f9fc',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '2rem',
    fonnt: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1rem',
    color: '#444',
  },
  input: {
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginTop: '0.4rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.8rem',
    borderRadius: '8px',
    background: '#0070f3',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  loading: {
    textAlign: 'center',
    marginTop: '4rem',
    fontSize: '1.2rem',
  },
};
