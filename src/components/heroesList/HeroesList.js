import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/heroes.api';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

// const userId = null;

const HeroesList = () => {
  // хук для получения данных с сервера
  // вызывается после первого рендера
  const { data: heroes = [], isError, isLoading } = useGetHeroesQuery();

  // Можем добавить условие, при котором запрос не выполнится
  // undefined, {
  //   skip: !userId,
  // };

  const [deleteHero] = useDeleteHeroMutation();

  const activeFilter = useSelector((state) => state.filters.activeFilter);

  const filteredHeroes = useMemo(() => {
    const filteredHeroes = [...heroes];

    if (activeFilter === 'all') {
      return filteredHeroes;
    } else {
      return filteredHeroes.filter((item) => item.element === activeFilter);
    }
  }, [heroes, activeFilter]);

  const { error } = useSelector((state) => state.heroes);

  const onDelete = useCallback(
    (id) => {
      deleteHero(id)
        .unwrap()
        .catch((error) => toast.error(error.data.message));
    },

    // eslint-disable-next-line
    [],
  );

  if (isLoading) {
    return <Spinner classes="mt-5" />;
  } else if (isError) {
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
