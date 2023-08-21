import ErrorPageConstructor from '../../components/ErrorPageConstructor/ErrorPageConstructor';
import notFoundImage from '../../assets/images/404-image.svg';
import { ROUTES } from '../../constants/routes';

const NotFoundPage = () => {
  const title = 'Not found';
  const linkText = 'back to the game';
  const linkColor = 'yellow';
  return (
    <>
      <ErrorPageConstructor
        image={notFoundImage}
        linkPath={ROUTES.error.notFound}
        linkText={linkText}
        title={title}
        linkColor={linkColor}
      />
    </>
  );
};

export default NotFoundPage;
