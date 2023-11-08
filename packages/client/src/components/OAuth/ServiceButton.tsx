import { Link } from 'react-router-dom';

import { REDIRECT_URI } from '../../constants/api';
import styles from './styles.module.scss';
import img from '../../assets/images/yandex_oauth.svg';

type TServiceButtonProps = {
  serviceId: string;
};

const ServiceButton: React.FC<TServiceButtonProps> = ({ serviceId }) => {
  const href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${REDIRECT_URI}`;
  return (
    <Link to={href} className={styles.oauth__link}>
      <img src={img} alt="yandex-oauth" />
    </Link>
  );
};

export default ServiceButton;
