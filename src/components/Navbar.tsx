import React from 'react';

interface Props {
  onClear: () => void;
  compareMode: boolean;
  onToggleCompare: (value: boolean) => void;
  provider: 'openmeteo' | 'openweather';
  onProviderChange: (value: 'openmeteo' | 'openweather') => void;
}

const Navbar: React.FC<Props> = ({ onClear, compareMode, onToggleCompare, provider, onProviderChange }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'transparent' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Weather App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item me-3">
              <label className="form-label me-2 mb-0">Proveedor</label>
              <select
                className="form-select form-select-sm d-inline-block w-auto"
                value={provider}
                onChange={(e) => {
                  const v = e.target.value === 'openweather' ? 'openweather' : 'openmeteo';
                  onProviderChange(v);
                }}
              >
                <option value="openmeteo">Open‑Meteo</option>
                <option value="openweather">OpenWeather</option>
              </select>
            </li>
            <li className="nav-item me-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="compareSwitch"
                  checked={compareMode}
                  onChange={(e) => onToggleCompare(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="compareSwitch">
                  Comparar múltiples
                </label>
              </div>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-outline-light btn-sm" onClick={onClear}>
                Limpiar resultados
              </button>
            </li>
          </ul>
          <div className="d-flex">
            <a
              href="https://github.com/brunochc"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link link-light"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
