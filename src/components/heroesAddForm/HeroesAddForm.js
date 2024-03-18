import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';
import { toast } from 'react-toastify';

import { useCreateHeroMutation } from '../../api/heroes.api';
import { useGetFiltersQuery } from '../../api/filters.api';
import { selectAllFilters } from '../heroesFilters/filtersSlice';
import HeroesAddFormLayout from './HeroesAddFormLayout';
import { BASE_URL } from '../../utils/constants';

const HeroesAddForm = () => {
  const [hero, setHero] = useState({
    name: '',
    description: '',
    element: '',
    img: '',
    errors: false,
  });

  const [createHero, { isLoading: isCreationLoading }] = useCreateHeroMutation();
  const {
    data: filtersData = [],
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useGetFiltersQuery();

  // const filtersSelector = createSelector(
  //   selectAllFilters,
  //   (state) => state.filters.filtersLoadingStatus,
  //   (state) => state.filters.error,
  //   (filters, filtersLoadingStatus, error) => {
  //     return { filters, filtersLoadingStatus, error };
  //   },
  // );

  // const { filters, filtersLoadingStatus, error } = useSelector(filtersSelector);

  const { request } = useHttp();

  const imgInputRef = useRef();

  const onReset = () => {
    setHero({
      name: '',
      description: '',
      element: '',
      img: '',
      errors: false,
    });

    imgInputRef.current.value = '';
  };

  const onHeroChange = (event) => {
    const { name, value } = event.target;

    setHero({
      ...hero,
      [name]: value,
    });
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);

    const config = {
      url: `${BASE_URL}/uploads`,
      method: 'POST',
      headers: {},
      body: formData,
    };

    request(config.url, config.method, config.body, config.headers)
      .then((data) => {
        setHero({
          ...hero,
          img: data.url,
        });
      })
      .catch((error) => console.error(error));
  };

  const onHeroAdd = (e) => {
    e.preventDefault();

    const { name, element, img, description } = hero;
    const errors = !name || !element || !img || !description;

    if (errors) {
      setHero({ ...hero, errors });
      return;
    }

    const newHero = {
      name,
      element,
      img,
      description,
    };

    createHero(newHero)
      .unwrap()
      .then(() => {
        toast.success('Герой создан');
      })
      .catch((rejectedValue) => {
        toast.error(rejectedValue.data.message);
      })
      .finally(onReset);
  };

  const renderFilters = (filters, isLoading, isError) => {
    if (isLoading) {
      return <option>Загрузка списка...</option>;
    } else if (isError) {
      return <option>Ошибка загрузки</option>;
    }

    const renderedFilters = filters.map(({ name, label }) => {
      //eslint-disable-next-line
      if (name === 'all') return;

      return (
        <option
          key={name}
          value={name}
        >
          {label}
        </option>
      );
    });

    return renderedFilters;
  };

  return (
    <HeroesAddFormLayout
      {...hero}
      onHeroChange={onHeroChange}
      onHeroAdd={onHeroAdd}
      onImageChange={onImageChange}
      isCreationLoading={isCreationLoading}
      imgInputRef={imgInputRef}
      filters={filtersData}
      isFiltersLoading={isFiltersLoading}
      isFiltersError={isFiltersError}
      renderFilters={renderFilters}
    />
  );
};

export default HeroesAddForm;
