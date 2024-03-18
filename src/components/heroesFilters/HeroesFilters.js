import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import { setActiveFilter } from './filtersSlice';
import { useGetFiltersQuery } from '../../api/filters.api';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const elementsClasses = {
  all: 'btn-dark',
  fire: 'btn-danger',
  water: 'btn-primary',
  wind: 'btn-success',
  earth: 'btn-secondary',
};

const HeroesFilters = () => {
  const { data: filtersData = [], isLoading, isError } = useGetFiltersQuery();

  const activeFilter = useSelector((state) => state.filters.activeFilter);

  const dispatch = useDispatch();

  const onFilterSelect = (filter) => () => {
    dispatch(setActiveFilter(filter));
  };

  const renderFilters = (arr, isLoading, isError) => {
    if (isLoading) {
      return <Spinner />;
    } else if (isError) {
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
        <div className="btn-group">{renderFilters(filtersData, isLoading, isError)}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
