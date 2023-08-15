import React from 'react'
import styles from './styles.module.css'
import defaultAvatar from '../../../static/images/default-avatar.svg'

const Profile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <span className={styles.info}>
          <p className={styles.hoverText}>Change avatar</p>
          <img
            className={styles.defaultImage}
            src={defaultAvatar}
            alt="Avatar"
          />
        </span>
      </div>

      <nav className={styles.navContainer}></nav>
    </div>
  )
}

export default Profile
