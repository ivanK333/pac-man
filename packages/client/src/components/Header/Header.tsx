import React from 'react'
import styles from './styles.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <ul className={styles.list}>
        <li className={styles.listItem}>Game</li>
        <li className={styles.listItem}>leaderboard</li>
        <li className={styles.listItemActive}>Profile</li>
        <li className={styles.listItem}>Forum</li>
      </ul>
    </header>
  )
}

export default Header
