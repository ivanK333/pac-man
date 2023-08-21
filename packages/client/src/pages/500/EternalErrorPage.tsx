import ErrorPageConstructor from '../../components/ErrorPageConstructor/ErrorPageConstructor';
import eternalErrorImage from '../../assets/images/500-image.svg';
import { ROUTES } from '../../constants/routes';

enum Colors {
  yellow = 'yellow',
  blue = 'blue',
  black = 'black',
}

const EternalErrorPage = () => {
  const linkText = 'back to the game';
  return (
    <>
      <ErrorPageConstructor
        linkText={linkText}
        linkPath={ROUTES.main.game}
        image={eternalErrorImage}
        linkColor={Colors.yellow}
        backgroundColor={Colors.black}
      />
    </>
  );
};

export default EternalErrorPage;
