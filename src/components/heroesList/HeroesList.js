import { useCallback } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { AnimatePresence } from 'framer-motion';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { BASE_URL } from '../../utils/constants';

const HeroesList = () => {
  // мемоизировали селектор
  const fulteredHeroesSelector = createSelector(
    (state) => state.heroes.heroes,
    (state) => state.filters.activeFilter,
    (heroes, activeFilter) => {
      if (activeFilter === 'all') {
        return heroes;
      } else {
        return heroes.filter((hero) => hero.element === activeFilter);
      }
    },
  );

  const filteredHeroes = useSelector(fulteredHeroesSelector);

  const heroesLoadingStatus = useSelector((state) => state.heroes.heroesLoadingStatus);

  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request(`${BASE_URL}/heroes`)
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback(
    (id) => {
      request(`${BASE_URL}/heroes/${id}`, 'DELETE')
        .then(() => dispatch(heroDeleted(id)))
        .catch((e) => console.error(e.message));
    },
    [dispatch, request],
  );

  if (heroesLoadingStatus === 'loading') {
    return <Spinner classes="mt-5" />;
  } else if (heroesLoadingStatus === 'error') {
    return <ErrorMessage classes="mt-5">Ошибка загрузки</ErrorMessage>;
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
