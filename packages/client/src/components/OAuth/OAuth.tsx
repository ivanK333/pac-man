import { useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import img from '../../assets/images/yandex_oauth.svg';
import { REDIRECT_URI } from '../../constants/api';
import { authController } from '../../controllers/AuthController';

export const OAuth = () => {
  const { getServiceId } = authController();

  const [serviceId, setServiceId] = useState<string>();

  const OAuth = useCallback(async () => {
    const serviceId = await getServiceId();

    setServiceId(serviceId);
  }, []);

  useEffect(() => {
    OAuth();
  }, []);

  const getYandexOauthButton = useCallback(() => {
    const href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${REDIRECT_URI}`;

    return (
      <Link to={href} className={styles.oauth__link}>
        <img src={img} alt="yandex-oauth" />
      </Link>
    );
  }, [serviceId]);

  return (
    <div className={styles.oauth}>{serviceId && getYandexOauthButton()}</div>
  );
};
