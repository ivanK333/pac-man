import ErrorPageConstructor from '../../components/ErrorPageConstructor/ErrorPageConstructor';
import notFoundImage from '../../assets/images/404-image.svg';
import { ROUTES } from '../../constants/routes';
import { Colors } from '../../constants/colors';
const NotFoundPage = () => {
  const title = 'Not found';
  const linkText = 'back to the game';
  return (
    <>
      <ErrorPageConstructor
        image={notFoundImage}
        linkPath={ROUTES.main.root}
        linkText={linkText}
        title={title}
        linkColor={Colors.yellow}
        backgroundColor={Colors.black}
      />
    </>
  );
};

export default NotFoundPage;
