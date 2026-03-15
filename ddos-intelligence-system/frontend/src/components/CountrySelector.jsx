import React, { useState, useEffect } from 'react';

// Base URL for API calls — uses VITE_API_URL in production, empty string for dev (Vite proxy)
const API_BASE = import.meta.env.VITE_API_URL || '';

export function CountrySelector() {
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    // Fetch available countries from backend
    fetch(`${API_BASE}/api/countries`)
      .then((res) => res.json())
      .then((data) => {
        if (data.countries) {
          setCountries(data.countries.sort((a, b) => a.name.localeCompare(b.name)));
          setSelected(data.countries[0]?.name || '');
        }
      })
      .catch(() => { /* Backend may not be running yet */ });
  }, []);

  const handleSimulate = async () => {
    setLoading(true);
    setStatusMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/simulate_country`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: selected, duration_seconds: 60 }),
      });
      
      if (!res.ok) {
        setStatusMsg(`Simulation failed (${res.status}).`);
        return;
      }

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        setStatusMsg(`Simulating attack from ${data.country}...`);
        setTimeout(() => setStatusMsg(''), 5000);
      } else {
        setStatusMsg('Invalid API response.');
      }
    } catch {
      setStatusMsg('API Error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)' }}>
          🎯
        </div>
        <div className="card__title">Targeted Simulation</div>
      </div>
      
      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
        Force attacks to originate from a specific region for intelligence analysis.
      </p>

      <div className="country-selector">
        <select 
          value={selected} 
          onChange={(e) => setSelected(e.target.value)}
          disabled={loading || countries.length === 0}
        >
          {countries.map((c) => (
            <option key={c.code} value={c.name}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>
        
        <button 
          className="simulate-btn" 
          onClick={handleSimulate} 
          disabled={loading || !selected}
        >
          {loading ? 'Initiating...' : 'Launch Simulation Array'}
        </button>
        
        {statusMsg && (
          <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--accent-green)', textAlign: 'center' }}>
            {statusMsg}
          </div>
        )}
      </div>
    </div>
  );
}
