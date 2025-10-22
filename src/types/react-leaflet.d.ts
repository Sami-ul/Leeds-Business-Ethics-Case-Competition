declare module 'react-leaflet' {
  import type { LatLngExpression, CircleMarkerOptions, TileLayerOptions, MapOptions } from 'leaflet';
  import type { ReactNode, RefAttributes } from 'react';

  export interface MapContainerProps extends MapOptions {
    center: LatLngExpression;
    zoom: number;
    style?: React.CSSProperties;
    children?: ReactNode;
  }

  export interface TileLayerProps extends TileLayerOptions {
    url: string;
    attribution?: string;
  }

  export interface CircleMarkerProps extends CircleMarkerOptions {
    center: LatLngExpression;
    children?: ReactNode;
  }

  export interface PopupProps {
    children?: ReactNode;
  }

  export const MapContainer: React.FC<MapContainerProps & RefAttributes<any>>;
  export const TileLayer: React.FC<TileLayerProps>;
  export const CircleMarker: React.FC<CircleMarkerProps>;
  export const Popup: React.FC<PopupProps>;
}
