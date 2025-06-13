import React, { useState, useEffect } from 'react';
import DevWinsForm from './DevWinsForm';
import DevWinsTable from './DevWinsTable';

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

  // Load wins from localStorage on mount
  useEffect(() => {
    const storedWins = localStorage.getItem('devWins');
    if (storedWins) {
      setWins(JSON.parse(storedWins));
    }
  }, []);

  // Save wins to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('devWins', JSON.stringify(wins));
  }, [wins]);

  const addWin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (win.description.trim()) {
      setWins([win, ...wins]);
      setWin(initialWin);
      // Send win to backend API to push to Google Sheets
      try {
        await fetch('http://localhost:5001/api/win', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(win),
        });
      } catch (err) {
        // Optionally handle error (e.g., show notification)
        console.error('Failed to push win to Google Sheet:', err);
      }
    }
  };

  const deleteWin = (idxToDelete: number) => {
    setWins(wins => wins.filter((_, idx) => idx !== idxToDelete));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Dev Wins Tracker</h2>
      <DevWinsForm win={win} setWin={setWin} addWin={addWin} />
      <DevWinsTable wins={wins} deleteWin={deleteWin} />
    </div>
  );
}
