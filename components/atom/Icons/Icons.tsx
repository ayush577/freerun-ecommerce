import React from 'react'
type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  logo: (props: IconProps) => (
    <svg viewBox="0 0 256 256" fill="none" {...props}>
      <path
        d="M161.716 199.943H191.446L163.653 151.811L135.86 199.943L117.009 232.595H8L127.282 23L146.134 55.6525L62.8245 199.943H98.1578L144.802 119.159L158.811 94.8943L163.792 86.2469L182.643 118.899L182.505 119.159L229.149 199.943L237.018 213.588L248 232.595H161.716V199.943Z"
        fill="currentColor"
      />
    </svg>
  ),
  cart: (props: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="8" cy="21" r="1"></circle>
      <circle cx="19" cy="21" r="1"></circle>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
    </svg>
  ),
  plus: (props: IconProps) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  ),
  minus: (props: IconProps) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  ),
  cross: (props: IconProps) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  ),
  greenTick: (props: IconProps) => (
    <svg viewBox="0 0 20 18" fill="none" {...props}>
      <g clipPath="url(#clip0_2034_1584)">
        <path
          d="M19.5617 8.83855L17.4581 6.50377L17.7873 3.37729L14.7114 2.72599L13.1425 0.00103161L10.272 1.283L7.40052 0L5.83367 2.72495L2.75777 3.37626L3.08704 6.50273L0.982422 8.83855L3.086 11.1733L2.75674 14.2988L5.83263 14.9501L7.40155 17.675L10.272 16.392L13.1436 17.675L14.7125 14.9501L17.7884 14.2988L17.4591 11.1723L19.5617 8.83855ZM14.1665 6.80413L9.50307 12.028L6.26305 8.78798L7.03409 8.01694L9.45868 10.4415L13.3531 6.07747L14.1665 6.80413Z"
          fill="#79B22B"
        />
      </g>
      <defs>
        <clipPath id="clip0_2034_1584">
          <rect
            width="18.5792"
            height="17.675"
            fill="white"
            transform="translate(0.982422)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  star: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    </svg>
  ),
  bookmark: (props: IconProps) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
      />
    </svg>
  ),
  bookmarkFilled: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
        clipRule="evenodd"
      />
    </svg>
  ),
}
