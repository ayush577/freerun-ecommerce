import React from 'react'
import { Icons } from '../Icons/Icons'
import styles from './rating.module.css'

type RatingProps = {
  value: number
  max?: number
}

const Rating = ({ value, max = 5 }: RatingProps) => {
  /* Calculate how much of the stars should be "filled" */
  const percentage = Math.round((value / max) * 100)

  return (
    <div className={styles.container}>
      {/* Create an array based on the max rating, render a star for each */}
      {Array.from(Array(max).keys()).map((_, i) => (
        <Icons.StarIcon key={String(i)} className={styles.star} />
      ))}
      {/* Render a div overlayed on top of the stars that are not filled */}
      <div
        className={styles.overlay}
        style={{ width: `${100 - percentage}%` }}
      />
    </div>
  )
}

export default Rating
