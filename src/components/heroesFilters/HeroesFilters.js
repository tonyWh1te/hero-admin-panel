import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import clsx from 'clsx';

import { filtersFetchThunk, setActiveFilter, selectAllFilters } from './filtersSlice';
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
  const filters = useSelector(selectAllFilters);

  const { filtersLoadingStatus, activeFilter, error } = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetchThunk(request));

    // eslint-disable-next-line
  }, []);

  const onFilterSelect = (filter) => () => {
    dispatch(setActiveFilter(filter));
  };

  const renderFilters = (arr, filtersLoadingStatus) => {
    if (filtersLoadingStatus === 'loading') {
      return <Spinner />;
    } else if (filtersLoadingStatus === 'error') {
      return <ErrorMessage>{error}</ErrorMessage>;
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
