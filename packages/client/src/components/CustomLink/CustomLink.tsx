import Link from '../Link';
import styles from './styles.module.scss';
import { Colors, TColorsType } from '../../assets/constants/colors';

type TCustomLink = {
  linkPath: string;
  linkColor: TColorsType;
  linkText: string;
};
const CustomLink: React.FC<TCustomLink> = ({
  linkPath,
  linkColor,
  linkText,
  ...rest
}) => {
  const linkTextClassname = () => {
    switch (linkColor) {
      case Colors.yellow:
        return styles.linkTextYellow;
      case Colors.blue:
        return styles.linkTextBlue;
      default:
        return styles.linkTextBlack;
    }
  };
  return (
    <>
      <Link to={linkPath} {...rest}>
        <p className={linkTextClassname()}>{linkText}</p>
      </Link>
    </>
  );
};

export default CustomLink;
