import { useCallback } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import { heroesFetchThunk, heroesDeleteThunk, filteredHeroesSelector } from './heroesSlice';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
  const filteredHeroes = useSelector(filteredHeroesSelector);

  const { status, error } = useSelector((state) => state.heroes);

  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetchThunk(request));

    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback(
    (id) => {
      dispatch(heroesDeleteThunk(id));
    },

    // eslint-disable-next-line
    [],
  );

  if (status === 'loading') {
    return <Spinner classes="mt-5" />;
  } else if (status === 'error') {
    return <ErrorMessage classes="mt-5">{error}</ErrorMessage>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map((item, i) => {
      return (
        <HeroesListItem
          key={item.id}
          onDelete={onDelete}
          index={i}
          {...item}
        />
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);

  return <ul>{<AnimatePresence>{elements}</AnimatePresence>}</ul>;
};

export default HeroesList;
