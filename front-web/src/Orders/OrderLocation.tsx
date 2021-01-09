import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import AsyncSelect from 'react-select/async';
import { fetchLocalMapBox } from '../api';
import { OrderLocationData } from './types';

type Place = {
  label?: string,
  value?: string,
  position: {
    lat: number,
    lng: number;
  };
};

type Props = {
  onChangeLocation: (location: OrderLocationData) => void;
};

const initalPosition = {
  lat: -15.841337,
  lng: -48.0507551
};

function OrderLocation({ onChangeLocation }: Props) {

  const [ address, setAddress ] = useState<Place>({
    position: initalPosition
  });

  const loadOptions = async (inputValue: string, callback: (places: Place[]) => void) => {
    const response = await fetchLocalMapBox(inputValue);

    const places = response.data.features.map((item: any) => {
      return ({
        label: item.place_name,
        value: item.place_name,
        position: {
          lat: item.center[ 1 ],
          lng: item.center[ 0 ]
        },
        place: item.place_name,
      });
    });

    callback(places);
  };

  const handleChangeSelect = (place: Place) => {
    setAddress(place);
    onChangeLocation({
      latitude: place.position.lat,
      longitude: place.position.lng,
      address: place.label!
    });
  };

  return (
    <div className="order-location-container">
      <div className="order-location-content">
        <h3 className="order-location-title">
          Selecione onde o pedido deve ser entregue:
        </h3>

        <div className="filter-container">
          <AsyncSelect
            placeholder="Digite o endereço para entregar o pedido"
            className="filter"
            loadOptions={ loadOptions }
            onChange={ value => handleChangeSelect(value as Place) }
          />
        </div>

        <MapContainer center={ address.position } zoom={ 14 } key={ `${address.position.lat},${address.position.lng}` }>
          <TileLayer
            url={ `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}` }
          />
          <Marker position={ address.position }>
            <Popup>
              { address.label }
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default OrderLocation;