import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Card } from '../component/card';

export const Starships = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.setLoading(true);
    actions.getInitialStarships(); 
  }, []);

  return (
    <div className="container d-flex flex-wrap justify-content-center">
      {store.starships.map((starship) => (
        <Card
          key={starship.uid}
          name={starship.name}
          uid={starship.uid}
          detailsUrl={starship.url}
          category="starships"
        />
      ))}
    </div>
  );
};
