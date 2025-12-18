'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Координаты Донецка
const DONETSK_COORDS: [number, number] = [48.0159, 37.8030];

// Кастомная иконка маркера в цвет сайта
const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C9A56B" width="40" height="40">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

interface MapProps {
  address?: string;
  className?: string;
}

export default function Map({ address = 'Донецк', className = '' }: MapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={`bg-gradient-to-br from-[#C9A56B]/20 to-blue-500/20 flex items-center justify-center ${className}`}>
        <div className="animate-pulse text-gray-500">Загрузка карты...</div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={DONETSK_COORDS}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        style={{ background: '#1f2937' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={DONETSK_COORDS} icon={customIcon}>
          <Popup className="custom-popup">
            <div className="text-center">
              <strong className="text-[#C9A56B]">Grand Hotel</strong>
              <br />
              <span className="text-gray-600 text-sm">{address}</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Overlay gradient для интеграции с дизайном */}
      <div className="absolute inset-0 pointer-events-none rounded-t-3xl" style={{
        background: 'linear-gradient(to bottom, transparent 90%, rgba(31, 41, 55, 0.3) 100%)'
      }} />
    </div>
  );
}
