import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { toast } from 'react-toastify';

import { heroesCreated, heroesCreation, heroesCreationError } from '../../actions';
import HeroesAddFormLayout from './HeroesAddFormLayout';
import { BASE_URL } from '../../utils/constants';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const [hero, setHero] = useState({
    name: '',
    description: '',
    element: '',
    img: '',
    errors: false,
  });

  const dispatch = useDispatch();
  const heroesCreationStatus = useSelector((state) => state.heroesCreationStatus);

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

  const onDataPost = (data) => {
    dispatch(heroesCreated({ ...hero, id: data.id }));
    toast.success('Герой создан');
  };

  const onError = () => {
    dispatch(heroesCreationError());
    toast.error('Не удалось создать героя');
  };

  const onHeroAdd = (e) => {
    e.preventDefault();

    const { name, element, img, description } = hero;
    const errors = !name || !element || !img || !description;

    if (errors) {
      setHero({ ...hero, errors });
      return;
    }

    dispatch(heroesCreation());

    request(`${BASE_URL}/heroes`, 'POST', JSON.stringify({ name, element, img, description }))
      .then(onDataPost)
      .catch(onError)
      .finally(onReset);
  };

  return (
    <HeroesAddFormLayout
      {...hero}
      onHeroChange={onHeroChange}
      onHeroAdd={onHeroAdd}
      onImageChange={onImageChange}
      heroesCreationStatus={heroesCreationStatus}
      imgInputRef={imgInputRef}
    />
  );
};

export default HeroesAddForm;
