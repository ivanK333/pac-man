import Header from '../../components/Header/Header';
import styles from './styles.module.scss';
import logo from '../../assets/images/logo.svg';

const Lending = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Приветствуем!</h1>
        <h3 className={styles.subtitle}>
          На связи команда <span>16 bit games</span>
        </h3>
        <h3 className={styles.edition}>и наше творение</h3>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>
    </>
  );
};

export default Lending;
