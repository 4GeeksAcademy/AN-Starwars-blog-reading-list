import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { CharacterList } from "../component/charactersList";

export const Characters = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getInitialCharacters();
  }, []);

  return (
    <div className="characters-view">
      <h2>Characters</h2>
      <CharacterList characters={store.characters} />
    </div>
  );
};
