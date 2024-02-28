import { ToastContainer, Bounce } from 'react-toastify';
import { LazyMotion, domAnimation } from 'framer-motion';
import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

import './app.scss';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <LazyMotion features={domAnimation}>
        <main className="app">
          <div className="content">
            <HeroesList />
            <div className="content__interactive">
              <HeroesAddForm />
              <HeroesFilters />
            </div>
          </div>
        </main>
      </LazyMotion>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
