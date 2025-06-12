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

type DevWinsTableProps = {
  wins: Win[];
  deleteWin: (idx: number) => void;
};

export default function DevWinsTable({ wins, deleteWin }: DevWinsTableProps) {
  return (
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
  );
}
