import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import clsx from 'clsx';

import {
  filtersFetched,
  filtersFetching,
  filtersFetchingError,
  setActiveFilter,
} from '../../actions';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { BASE_URL } from '../../utils/constants';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const elementsClasses = {
  all: 'btn-dark',
  fire: 'btn-danger',
  water: 'btn-primary',
  wind: 'btn-success',
  earth: 'btn-secondary',
};

const HeroesFilters = () => {
  const { filters, filtersLoadingStatus, activeFilter } = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request(`${BASE_URL}/filters`)
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));

    // eslint-disable-next-line
  }, []);

  const onFilterSelect = (filter) => () => {
    dispatch(setActiveFilter(filter));
  };

  const renderFilters = (arr, filtersLoadingStatus) => {
    if (filtersLoadingStatus === 'loading') {
      return <Spinner />;
    } else if (filtersLoadingStatus === 'error') {
      return <ErrorMessage>Ошибка загрузки</ErrorMessage>;
    }

    const renderedFilters = arr.map(({ name, label }) => {
      const elementClass = elementsClasses[name];

      const btnClass = clsx({
        btn: true,
        [elementClass]: true,
        active: name === activeFilter,
      });

      return (
        <button
          key={name}
          className={btnClass}
          onClick={onFilterSelect(name)}
        >
          {label}
        </button>
      );
    });

    return renderedFilters;
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{renderFilters(filters, filtersLoadingStatus)}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
