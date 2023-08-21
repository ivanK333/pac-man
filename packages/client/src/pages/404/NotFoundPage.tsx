import ErrorPageConstructor from '../../components/ErrorPageConstructor/ErrorPageConstructor';
import notFoundImage from '../../assets/images/404-image.svg';
import { ROUTES } from '../../constants/routes';

enum Colors {
  yellow = 'yellow',
  blue = 'blue',
  black = 'black',
}

const NotFoundPage = () => {
  const title = 'Not found';
  const linkText = 'back to the game';
  return (
    <>
      <ErrorPageConstructor
        image={notFoundImage}
        linkPath={ROUTES.main.game}
        linkText={linkText}
        title={title}
        linkColor={Colors.yellow}
        backgroundColor={Colors.black}
      />
    </>
  );
};

export default NotFoundPage;
