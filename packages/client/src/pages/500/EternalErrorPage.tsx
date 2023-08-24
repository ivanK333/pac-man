import ErrorPageConstructor from '../../components/ErrorPageConstructor/ErrorPageConstructor';
import eternalErrorImage from '../../assets/images/500-image.svg';
import { ROUTES } from '../../constants/routes';
import { Colors } from '../../assets/constants/colors';
const EternalErrorPage = () => {
  const linkText = 'back to the game';
  return (
    <>
      <ErrorPageConstructor
        linkText={linkText}
        linkPath={ROUTES.main.root}
        image={eternalErrorImage}
        linkColor={Colors.yellow}
        backgroundColor={Colors.black}
      />
    </>
  );
};

export default EternalErrorPage;
