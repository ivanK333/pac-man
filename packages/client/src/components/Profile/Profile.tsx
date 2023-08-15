import React from 'react'
import styles from './styles.module.css'
import pacmanImage from '../../images/pacman-background.svg'

const Profile = () => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={pacmanImage} alt="pacman" />
    </div>
  )
}

export default Profile
