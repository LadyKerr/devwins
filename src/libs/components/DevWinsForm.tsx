import React from 'react';

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

type DevWinsFormProps = {
  win: Win;
  setWin: React.Dispatch<React.SetStateAction<Win>>;
  addWin: (e: React.FormEvent) => void;
};

export default function DevWinsForm({ win, setWin, addWin }: DevWinsFormProps) {
  return (
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
  );
}
