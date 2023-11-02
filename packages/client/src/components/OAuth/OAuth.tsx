import { useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import img from '../../assets/images/yandex_oauth.svg';
import { REDIRECT_URI } from '../../constants/api';
//import { authController } from '../../controllers/AuthController';

export const OAuth = () => {
  /*  const { getServiceId } = authController();

  const [serviceId, setServiceId] = useState<string>();

  const loadServiceId = useCallback(async () => {
    const serviceId = await getServiceId();

    setServiceId(serviceId);
  }, []);

  useEffect(() => {
    loadServiceId();
  }, []);*/

  const getYandexOauthButton = useCallback(() => {
    const client_id = '55c27cf80ba64bb39209404becf9820a';
    const href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${client_id}&redirect_uri=${REDIRECT_URI}`;

    return (
      <Link to={href} className={styles.oauth__link}>
        <img src={img} alt="yandex-oauth" />
      </Link>
    );
  }, []);

  return <div className={styles.oauth}>{getYandexOauthButton()}</div>;
};
