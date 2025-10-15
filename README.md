# Weather App

This is a simple weather application built with React and TypeScript. The app allows users to input a city name and fetches the current weather data from the Open-Meteo API.

## Project Structure

```
weather-app
├── src
│   ├── api
│   │   └── weatherService.ts       # Functions to interact with the Open-Meteo API
│   ├── components
│   │   ├── WeatherDisplay.tsx       # Component to display weather data
│   │   └── CityInput.tsx           # Component for user input of city name
│   ├── App.tsx                      # Main application component
│   └── types
│       └── index.ts                 # TypeScript interfaces for weather data
├── public
│   └── index.html                   # Main HTML file for the application
├── package.json                     # npm configuration file
├── tsconfig.json                    # TypeScript configuration file
└── README.md                        # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Usage

- Enter the name of a city in the input field and submit the form.
- The application will fetch and display the current weather data for the specified city.

## API

This application uses the Open-Meteo API to retrieve weather data. Ensure you have access to the API and check the documentation for any usage limits or requirements.

## License

This project is licensed under the MIT License.

🌤️ Weather App - Aplicación de Clima con React

Una aplicación web moderna construida con React y TypeScript que proporciona información meteorológica en tiempo real para ciudades de todo el mundo.
📋 Tabla de Contenidos

    Características

    Demo

    Instalación

    Uso

    Estructura del Proyecto

    Tecnologías Utilizadas

    Manejo de Errores

    Mejoras Futuras

    Contribución

✨ Características

    Búsqueda Inteligente: Autocompletado para ciudades soportadas (Londres, Nueva York, Tokio, Sídney)

    Datos Completos: Visualización de temperatura, humedad, velocidad del viento y descripción climática

    Interfaz Responsive: Diseño adaptable que funciona en dispositivos móviles y desktop

    Tipado Estático: Desarrollado con TypeScript para mayor robustez

    Manejo de Errores: Gestión elegante de errores de API y entradas inválidas


Sigue estos pasos para instalar y ejecutar la aplicación localmente:
Prerrequisitos

    Node.js (versión 14 o superior)

    npm o yarn

Pasos de instalación

    Clona el repositorio:

bash

git clone https://github.com/tu-usuario/weather-app.git
cd weather-app

    Instala las dependencias:

bash

npm install
# o
yarn install

    Inicia la aplicación en modo desarrollo:

bash

npm start
# o
yarn start

    Abre tu navegador y ve a http://localhost:3000

Configuración de API

Para conectar con una API meteorológica real:

    Crea un archivo .env en la raíz del proyecto:

bash

REACT_APP_WEATHER_API_KEY=tu_api_key_aqui
REACT_APP_WEATHER_API_URL=https://api.weatherapi.com/v1

    Configura el servicio de API en src/api/weatherService.ts:

typescript

import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL;

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`
    );
    
    return {
      city: response.data.location.name,
      temperature: response.data.current.temp_c,
      humidity: response.data.current.humidity,
      windSpeed: response.data.current.wind_kph,
      description: response.data.current.condition.text
    };
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
};

💡 Uso

    Búsqueda de Ciudad:

        Escribe el nombre de una ciudad en el campo de búsqueda

        Selecciona una de las sugerencias que aparecen (Londres, Nueva York, Tokio, Sídney)

        Presiona "Get Weather" o Enter para buscar

    Visualización de Datos:

        La aplicación mostrará temperatura actual en °C

        Porcentaje de humedad

        Velocidad del viento en km/h

        Descripción textual del clima

    Búsquedas Adicionales:

        Repite el proceso para consultar otras ciudades

        El campo de búsqueda se limpia automáticamente después de cada consulta

🏗️ Estructura del Proyecto
text

src/
├── components/
│   ├── CityInput.tsx          # Componente de entrada con autocompletado
│   └── WeatherDisplay.tsx     # Componente de visualización de datos
├── api/
│   └── weatherService.ts      # Servicio para fetching de datos meteorológicos
├── types/
│   └── index.ts               # Definiciones de tipos TypeScript
├── App.tsx                    # Componente principal de la aplicación
├── App.css                    # Estilos principales
└── index.tsx                  # Punto de entrada de la aplicación

Descripción de Componentes

    App.tsx: Componente principal que gestiona el estado global y coordina los demás componentes

    CityInput.tsx: Input con funcionalidad de autocompletado y sugerencias

    WeatherDisplay.tsx: Presentación de datos meteorológicos con formato

    weatherService.ts: Servicio abstracto para conexión con API meteorológica

🛠️ Tecnologías Utilizadas

    React 18+: Biblioteca principal para la interfaz de usuario

    TypeScript: Superset de JavaScript para tipado estático

    React Hooks: useState para gestión de estado local

    CSS3: Estilos responsive y modernos

    API Meteorológica: Integración con servicios de datos climáticos

⚠️ Manejo de Errores

La aplicación implementa un manejo robusto de errores:

    Ciudades No Soportadas:

        El autocompletado solo sugiere ciudades válidas

        Validación en tiempo real de entradas

    Errores de API:

        Mensajes de error claros para el usuario

        Fallback graceful sin interrumpir la experiencia

    Errores de Conexión:

        Detección de problemas de red

        Sugerencias para reconectar

Ejemplo de manejo de errores en el código:
typescript

const handleCitySubmit = async (cityName: string) => {
  setCity(cityName);
  setError(null);
  try {
    const data = await fetchWeatherData(cityName);
    setWeatherData(data);
  } catch (err) {
    setError('Error fetching weather data. Please try again.');
    setWeatherData(null);
  }
};

🔮 Mejoras Futuras

    Ampliar Cobertura de Ciudades: Añadir más ciudades al sistema de autocompletado

    Pronóstico Extendido: Implementar visualización de pronóstico a 5 días

    Geolocalización: Detectar ubicación automáticamente para clima local

    Unidades Personalizables: Permitir cambiar entre Celsius/Fahrenheit y km/h/mph

    Modo Oscuro: Implementar toggle de tema oscuro/claro

    Historial de Búsquedas: Almacenar búsquedas recientes

    Tests: Añadir suite de tests unitarios y de integración

    Internationalización: Soporte para múltiples idiomas

    PWA: Convertir en Progressive Web App para instalación offline

🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

    Haz fork del proyecto

    Crea una rama para tu feature (git checkout -b feature/AmazingFeature)

    Commit tus cambios (git commit -m 'Add some AmazingFeature')

    Push a la rama (git push origin feature/AmazingFeature)

    Abre un Pull Request

📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.
👥 Autores

    Tu Nombre - @tu-usuario

🙏 Agradecimientos

    Open-Meteo por proporcionar API meteorológica gratuita

    Comunidad de React y TypeScript por recursos y documentación

