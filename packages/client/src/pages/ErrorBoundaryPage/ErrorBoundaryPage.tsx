import ErrorPageConstructor from '../../components/ErrorPageConstructor/ErrorPageConstructor';
import { ROUTES } from '../../constants/routes';
import pacmanErrorImage from '../../assets/images/pacman-error.svg';
import { Colors } from '../../constants/colors';

const ErrorBoundaryPage = () => {
  const linkText = 'back to the game';
  const titleText = 'Something went wrong';

  return (
    <>
      <ErrorPageConstructor
        linkText={linkText}
        linkPath={ROUTES.main.root}
        image={pacmanErrorImage}
        linkColor={Colors.yellow}
        title={titleText}
        backgroundColor={Colors.black}
      />
    </>
  );
};

export default ErrorBoundaryPage;
