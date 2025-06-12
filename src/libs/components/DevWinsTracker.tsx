import React, { useState } from 'react';

type Win = {
  year: string;
  month: string;
  description: string;
  measurable: 'y' | 'n';
  details: string;
  technical: string;
  category: string;
  image: string;
};

const initialWin: Win = {
  year: '',
  month: '',
  description: '',
  measurable: 'n',
  details: '',
  technical: '',
  category: '',
  image: '',
};

export default function DevWinsTracker() {
  const [wins, setWins] = useState<Win[]>([]);
  const [win, setWin] = useState<Win>(initialWin);

  const addWin = (e: React.FormEvent) => {
    e.preventDefault();
    if (win.description.trim()) {
      setWins([win, ...wins]);
      setWin(initialWin);
    }
  };

  const deleteWin = (idxToDelete: number) => {
    setWins(wins => wins.filter((_, idx) => idx !== idxToDelete));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Dev Wins Tracker</h2>
      <form onSubmit={addWin} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          className="border rounded px-3 py-2"
          placeholder="Year"
          value={win.year}
          onChange={e => setWin({ ...win, year: e.target.value })}
        />
        <input
          type="text"
          className="border rounded px-3 py-2"
          placeholder="Month"
          value={win.month}
          onChange={e => setWin({ ...win, month: e.target.value })}
        />
        <input
          type="text"
          className="border rounded px-3 py-2 md:col-span-2"
          placeholder="Description"
          value={win.description}
          onChange={e => setWin({ ...win, description: e.target.value })}
        />
        <select
          className="border rounded px-3 py-2"
          value={win.measurable}
          onChange={e => setWin({ ...win, measurable: e.target.value as 'y' | 'n' })}
        >
          <option value="y">Measurable Impact: Yes</option>
          <option value="n">Measurable Impact: No</option>
        </select>
        <input
          type="text"
          className="border rounded px-3 py-2"
          placeholder="Technical/Nontechnical"
          value={win.technical}
          onChange={e => setWin({ ...win, technical: e.target.value })}
        />
        <input
          type="text"
          className="border rounded px-3 py-2"
          placeholder="Category"
          value={win.category}
          onChange={e => setWin({ ...win, category: e.target.value })}
        />
        <input
          type="text"
          className="border rounded px-3 py-2"
          placeholder="Image URL"
          value={win.image}
          onChange={e => setWin({ ...win, image: e.target.value })}
        />
        <textarea
          className="border rounded px-3 py-2 md:col-span-2"
          placeholder="Details"
          value={win.details}
          onChange={e => setWin({ ...win, details: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:col-span-2"
        >
          Add Win
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Year</th>
              <th className="p-2">Month</th>
              <th className="p-2">Description</th>
              <th className="p-2">Measurable</th>
              <th className="p-2">Details</th>
              <th className="p-2">Technical</th>
              <th className="p-2">Category</th>
              <th className="p-2">Image</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {wins.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center text-gray-500 py-4">No wins yet. Add your first!</td>
              </tr>
            )}
            {wins.map((w, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{w.year}</td>
                <td className="p-2">{w.month}</td>
                <td className="p-2">{w.description}</td>
                <td className="p-2">{w.measurable}</td>
                <td className="p-2">{w.details}</td>
                <td className="p-2">{w.technical}</td>
                <td className="p-2">{w.category}</td>
                <td className="p-2">
                  {w.image ? <img src={w.image} alt="win" className="w-12 h-12 object-cover rounded" /> : ''}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => deleteWin(idx)}
                    className="text-red-500 hover:text-red-700 text-xs font-semibold"
                    aria-label="Delete win"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
