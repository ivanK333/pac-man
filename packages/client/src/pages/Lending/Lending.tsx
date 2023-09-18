import { Link } from 'react-router-dom';

import Header from '../../components/Header/Header';
import styles from './styles.module.scss';
import spriteSvg from '../../assets/images/greenSprite.svg';
import logo from '../../assets/images/logo.svg';
import background from '../../assets/images/lending_2.svg';
import author from '../../assets/images/Iwatani.png';
import spriteRed from '../../assets/images/bigRedSprite.svg';
import pacman from '../../assets/images/bigPacman.svg';
import spriteGreen from '../../assets/images/greenBigSprite.svg';
import spritePurple from '../../assets/images/purpleBigSprite.svg';
import spriteBlue from '../../assets/images/blueBigSprite.svg';
import spritePink from '../../assets/images/pinkBigSprite.svg';
import Nikita from '../../assets/images/Nikita.png';
import Midkhat from '../../assets/images/Midkhat.png';
import Polina from '../../assets/images/Polina.png';
import Sergey from '../../assets/images/Sergey.png';
import Ilya from '../../assets/images/Ilya.png';
import Ivan from '../../assets/images/Ivan.png';
import FormButtonGroup from '../../components/FormComponent/FormButtonGroup/FormButton';
import { ROUTES } from '../../constants/routes';

const Lending = () => {
  return (
    <>
      <Header />
      <div className={styles.page}>
        <section className={styles.container}>
          <img
            src={background}
            alt="background"
            className={styles.background}
          />
          <h1 className={styles.title}>Приветствуем!</h1>
          <h3 className={styles.subtitle}>
            На связи команда <span>16 bit games</span>
          </h3>
          <h3 className={styles.edition}>и наше творение</h3>
          <img src={logo} alt="logo" className={styles.logo} />
          <p className={styles.description}>
            Учебный проект яндекс-практикума на курсе Мидл фронтенд-разработчик.
          </p>
        </section>
        <section className={styles.aboutGame}>
          <h3 className={styles.gameTitle}>
            <span>Pac-Man</span>— одна из знаковых видеоигр всех времен
          </h3>
          <p className={styles.gameDescription}>
            Большинство людей (даже не геймеров) по крайней мере знакомы с ней.
            Цель игры очень проста — игрок находится в лабиринте, наполненном
            «едой» (изображенной в виде точек), и ему нужно съесть их все, чтобы
            пройти на следующий уровень. Задачу осложняют четыре призрака,
            преследующих пэкмена. Если пэкмен встретится с одним из привидений,
            он теряет жизнь и возвращается на начало, так же как съеденные им
            точки.
          </p>
          <p className={styles.gameQuote}>
            «В то время все доступные игры были очень жестокими — игры о войне и
            космических захватчиках. Не было ни одной игры для всех сразу, а
            особенно, которые понравились бы девушкам. Я хотел придумать
            «комическую» игру, которой могли бы наслаждаться даже девушки»
          </p>
          <p className={styles.gameAuthor}>— Toru Iwatani, создатель Pac-Man</p>
          <img src={author} alt="logo" className={styles.authorImg} />
        </section>
        <section className={styles.aboutUs}>
          <p className={styles.usDescription}>
            В рамках проекта мы воссоздали оригинальную игру, добавили рейтинг
            игроков и форум для общения. Присоединяйтесь!
          </p>
          <Link to={ROUTES.main.game} className={styles.btn}>
            <FormButtonGroup
              title="Play"
              spriteImg={spriteSvg}
              bottomText="Join us!"
            />
          </Link>
          <h3 className={styles.title}>Это мы:</h3>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to={'https://github.com/ivanK333'} className={styles.name}>
                Ivan
              </Link>
              <div className={styles.wrap}>
                <img src={spriteRed} alt="sprite" className={styles.sprite} />
                <img src={Ivan} alt="sprite" className={styles.photo} />
              </div>
            </li>
            <li className={styles.item}>
              <Link to={'https://github.com/zubastu'} className={styles.name}>
                Ilya
              </Link>
              <div className={styles.wrap}>
                <img
                  src={spritePurple}
                  alt="sprite"
                  className={styles.sprite}
                />
                <img src={Ilya} alt="sprite" className={styles.photo} />
              </div>
            </li>
            <li className={styles.item}>
              <Link
                to={'https://github.com/razuvaevcr'}
                className={styles.name}
              >
                Sergey
              </Link>
              <div className={styles.wrap}>
                <img src={spriteGreen} alt="sprite" className={styles.sprite} />
                <img src={Sergey} alt="sprite" className={styles.photo} />
              </div>
            </li>
            <li className={styles.item}>
              <Link
                to={'https://github.com/PolinaKuksova2022'}
                className={styles.name}
              >
                Polina
              </Link>
              <div className={styles.wrap}>
                <img src={spritePink} alt="sprite" className={styles.sprite} />
                <img src={Polina} alt="sprite" className={styles.photo} />
              </div>
            </li>
            <li className={styles.item}>
              <Link to={'https://github.com/MIdkhat'} className={styles.name}>
                Midkhat
              </Link>
              <div className={styles.wrap}>
                <img src={spriteBlue} alt="sprite" className={styles.sprite} />
                <img src={Midkhat} alt="sprite" className={styles.photo} />
              </div>
            </li>
            <li className={styles.item}>
              <Link to={'https://github.com/nvisary'} className={styles.name}>
                Nikita
              </Link>
              <div className={styles.wrap}>
                <img src={pacman} alt="sprite" className={styles.sprite} />
                <img src={Nikita} alt="sprite" className={styles.photo} />
              </div>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default Lending;
