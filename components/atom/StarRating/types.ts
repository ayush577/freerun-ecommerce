/* eslint-disable no-unused-vars */
export interface StarRatingProps {
  className?: string
  initialRating?: number
  onRatingChanged?: (rating?: number) => void
  readOnlyRating?: boolean
  size?: number
  hideDisabledStar?: boolean
  totalRating?: number
}

export interface StarIconButtonProps {
  readOnlyRating?: boolean
  size?: number
  onRatingChanged?: (rating?: number) => void
  setRating?: (rating?: number) => void
}