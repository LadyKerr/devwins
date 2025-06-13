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
  wins: Win[];
  setWins: React.Dispatch<React.SetStateAction<Win[]>>;
  message?: { type: 'success' | 'error'; text: string } | null;
};

function exportJSON(wins: Win[]) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSO`11N.stringify(wins, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "devwins.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function exportCSV(wins: Win[]) {
  const header = Object.keys(wins[0] || {}).join(",");
  const rows = wins.map(win => Object.values(win).map(v => `"${String(v).replace(/"/g, '""')}"`).join(","));
  const csv = [header, ...rows].join("\n");
  const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "devwins.csv");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function importWins(e: React.ChangeEvent<HTMLInputElement>, setWins: React.Dispatch<React.SetStateAction<Win[]>>) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      let wins: Win[] = [];
      if (file.name.endsWith('.json')) {
        wins = JSON.parse(event.target?.result as string);
      } else if (file.name.endsWith('.csv')) {
        const text = event.target?.result as string;
        const [header, ...lines] = text.split(/\r?\n/);
        const keys = header.split(',');
        wins = lines.filter(Boolean).map(line => {
          const values = line.match(/\"([^\"]*)\"|[^,]+/g)?.map(v => v.replace(/^\"|\"$/g, '')) || [];
          const obj: any = {};
          keys.forEach((k, i) => obj[k] = values[i] || '');
          return obj as Win;
        });
      }
      setWins(wins);
    } catch (err) {
      alert('Failed to import wins: ' + err);
    }
  };
  reader.readAsText(file);
}

export default function DevWinsForm({ win, setWin, addWin, wins, setWins, message }: DevWinsFormProps) {
  return (
    <form onSubmit={addWin} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Show success/error message */}
      {message && (
        <div
          className={`md:col-span-2 px-4 py-2 mb-2 rounded text-center ${
            message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {message.text}
        </div>
      )}
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
      <div className="flex gap-2 md:col-span-2">
        <button type="button" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => exportJSON(wins)}>
          Export as JSON
        </button>
        <button type="button" className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700" onClick={() => exportCSV(wins)}>
          Export as CSV
        </button>
        <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300">
          Import
          <input type="file" accept=".json,.csv" className="hidden" onChange={e => importWins(e, setWins)} />
        </label>
      </div>
    </form>
  );
}
