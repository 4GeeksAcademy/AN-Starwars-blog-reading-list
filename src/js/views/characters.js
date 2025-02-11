import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Card } from '../component/card';

export const Characters = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.setLoading(true);
    actions.getInitialCharacters()
  }, []);

  return (
    <>
    <div className="container d-flex flex-wrap justify-content-center">
    {store.characters.map((character, index) => (
                    <Card 
                        key={index} 
                        name={character.name} 
                        uid={character.uid} 
                        detailsUrl={character.url} 
                        category="characters"
                    />
                ))}
    
    </div>
    </>
  );
};
