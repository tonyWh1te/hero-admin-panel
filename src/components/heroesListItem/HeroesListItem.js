import { memo } from 'react';
import { m } from 'framer-motion';
import { liVariants } from '../../utils/constants';

const heroClasses = {
  fire: 'bg-danger bg-gradient',
  water: 'bg-primary bg-gradient',
  wind: 'bg-success bg-gradient',
  earth: 'bg-secondary bg-gradient',
  default: 'bg-warning bg-gradient',
};

const HeroesListItem = ({ name, description, element, img, id, onDelete, index }) => {
  const heroDelete = (id) => () => {
    onDelete(id);
  };

  return (
    <m.li
      className={`card flex-row mb-4 shadow-lg text-white ${heroClasses[element]}`}
      variants={liVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ type: 'spring' }}
      layout
      custom={index}
    >
      <img
        src={img}
        className="img-fluid w-25 d-inline"
        alt={name}
        style={{ objectFit: 'cover' }}
      />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <span
        className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light"
        onClick={heroDelete(id)}
      >
        <button
          type="button"
          className="btn-close btn-close"
          aria-label="Close"
        ></button>
      </span>
    </m.li>
  );
};

export default memo(HeroesListItem);
