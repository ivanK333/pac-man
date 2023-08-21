import ErrorPageConstructor from '../../components/ErrorPageConstructor/ErrorPageConstructor';
import eternalErrorImage from '../../assets/images/500-image.svg';
import { ROUTES } from '../../constants/routes';

const EternalErrorPage = () => {
  const linkText = 'back to the game';
  const linkColor = 'blue';
  return (
    <>
      <ErrorPageConstructor
        linkText={linkText}
        linkPath={ROUTES.error.internalError}
        image={eternalErrorImage}
        linkColor={linkColor}
      />
    </>
  );
};

export default EternalErrorPage;
