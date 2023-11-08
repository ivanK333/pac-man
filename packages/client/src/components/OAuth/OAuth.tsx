import { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import { authController } from '../../controllers/AuthController';
import ServiceButton from './ServiceButton';

export const OAuth = () => {
  const [serviceId, setServiceId] = useState<string>('');

  const { getServiceId } = authController();

  useEffect(() => {
    const loadServiceId = async () => {
      const serviceId = await getServiceId();
      setServiceId(serviceId);
    };
    loadServiceId();
  }, []);

  return (
    <div className={styles.oauth}>
      {serviceId && <ServiceButton serviceId={serviceId} />}
    </div>
  );
};
