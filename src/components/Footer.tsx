import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center fixed-bottom py-2" style={{ background: 'transparent', color: '#fff' }}>
      <small>
        © {new Date().getFullYear()} Derechos reservados — Hecho por
        {' '}
        <a
          href="https://github.com/brunochc"
          target="_blank"
          rel="noopener noreferrer"
          className="link-light text-decoration-none"
        >
          Bruno Henriquez
        </a>
        {' · '}Datos por{' '}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-light text-decoration-none"
        >
          Open‑Meteo
        </a>
        {' / '}
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-light text-decoration-none"
        >
          OpenWeather
        </a>
      </small>
    </footer>
  );
};

export default Footer;
