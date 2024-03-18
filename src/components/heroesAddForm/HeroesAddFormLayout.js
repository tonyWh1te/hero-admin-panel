import Spinner from '../spinner/Spinner';
import InputErrorMessage from '../inputErrorMessage/InputErrorMessage';

const hasError = (errors, value) => errors && !value;

const HeroesAddFormLayout = ({
  name,
  description,
  element,
  errors,
  img,
  onHeroChange,
  onHeroAdd,
  onImageChange,
  isCreationLoading,
  imgInputRef,
  filters,
  isFiltersLoading,
  renderFilters,
  isFiltersError,
}) => {
  const btnSubmitContent = isCreationLoading ? <Spinner /> : 'Создать';

  return (
    <form className="border p-4 shadow-lg rounded">
      <div>
        <label
          htmlFor="name"
          className="form-label"
        >
          Имя нового героя
        </label>
        <input
          type="text"
          name="name"
          className={`form-control ${hasError(errors, name) && 'is-invalid'}`}
          id="name"
          placeholder="Как меня зовут?"
          value={name}
          onChange={onHeroChange}
        />
        <InputErrorMessage hasError={hasError(errors, name)} />
      </div>

      <div>
        <label
          htmlFor="text"
          className="form-label"
        >
          Описание
        </label>
        <textarea
          name="description"
          className={`form-control ${hasError(errors, description) && 'is-invalid'}`}
          id="text"
          placeholder="Что я умею?"
          style={{ height: '130px' }}
          value={description}
          onChange={onHeroChange}
        />
        <InputErrorMessage hasError={hasError(errors, description)} />
      </div>

      <div>
        <label
          htmlFor="element"
          className="form-label"
        >
          Выбрать элемент героя
        </label>
        <select
          className={`form-select ${hasError(errors, element) && 'is-invalid'}`}
          id="element"
          name="element"
          value={element}
          onChange={onHeroChange}
        >
          <option>Я владею элементом...</option>
          {renderFilters(filters, isFiltersLoading, isFiltersError)}
        </select>
        <InputErrorMessage hasError={hasError(errors, element)} />
      </div>

      <div>
        <label
          htmlFor="img"
          className="form-label"
        >
          Обложка
        </label>
        <input
          ref={imgInputRef}
          type="file"
          accept=".png,.jpg"
          name="img"
          className={`form-control ${hasError(errors, img) && 'is-invalid'}`}
          id="img"
          onChange={onImageChange}
        />
        <InputErrorMessage hasError={hasError(errors, img)} />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        onClick={onHeroAdd}
      >
        {btnSubmitContent}
      </button>
    </form>
  );
};

export default HeroesAddFormLayout;
