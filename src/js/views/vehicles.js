import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Card } from '../component/card';

export const Vehicles = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.setLoading(true);
    actions.getInitialVehicles();
  }, []);
  return (
    <div className="container d-flex flex-wrap justify-content-center">
      {store.vehicles.map((vehicle) => (
        <Card
          key={vehicle.uid}
          name={vehicle.name}
          uid={vehicle.uid}
          detailsUrl={vehicle.url}
          category="vehicles"
        />
      ))}
    </div>
  );
};