import { useCallback } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { BASE_URL } from '../../utils/constants';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const { filteredHeroes, heroesLoadingStatus } = useSelector(
    (state) => ({
      filteredHeroes: state.filteredHeroes,
      heroesLoadingStatus: state.heroesLoadingStatus,
    }),
    shallowEqual,
  );

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

    return arr.map((item) => {
      return (
        <HeroesListItem
          key={item.id}
          onDelete={onDelete}
          {...item}
        />
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
