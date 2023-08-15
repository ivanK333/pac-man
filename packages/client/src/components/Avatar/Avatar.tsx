import React from 'react'
import styles from './styles.module.css'
import defaultAvatar from '../../../static/images/default-avatar.svg'

const Avatar = () => {
  return (
    <div className={styles.imageContainer}>
      <span className={styles.wrapper}>
        <div className={styles.hoverOverlay}>
          <p className={styles.hoverText}>Change avatar</p>
        </div>
        <img className={styles.defaultImage} src={defaultAvatar} alt="Avatar" />
      </span>
    </div>
  )
}

export default Avatar
