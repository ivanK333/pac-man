import { Link as RouterLink, LinkProps } from 'react-router-dom';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { FormFlavor } from '../../../commonTypes';

interface FormLinkProps extends LinkProps {
  text: string;
  linkText: string;
  flavor?: FormFlavor;
}

const FormLink: React.FC<FormLinkProps> = (props) => {
  const linkClass = classNames(
    styles.link,
    { [styles.login]: props.flavor === 'login' },
    { [styles.register]: props.flavor === 'register' },
  );
  return (
    <p className={linkClass}>
      <span>{props.text} </span>
      <RouterLink to={props.to}>{props.linkText}</RouterLink>
    </p>
  );
};

export default FormLink;
