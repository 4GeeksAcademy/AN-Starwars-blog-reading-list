import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Card } from '../component/card';

export const Planets = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.setLoading(true);
    actions.getInitialPlanets(); 
  }, []);

  return (
    <div className="container d-flex flex-wrap justify-content-center">
      {store.planets.map((planet) => (
        <Card
          key={planet.uid}
          name={planet.name}
          uid={planet.uid}
          detailsUrl={planet.url}
          category="planets"
        />
      ))}
    </div>
  );
};
