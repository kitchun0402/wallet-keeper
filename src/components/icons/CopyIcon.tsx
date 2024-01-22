import { type ComponentProps } from 'react'

type Props = ComponentProps<'svg'>
function CopyIcon({ ...props }: Props) {
  return (
    <svg
      fill="none"
      width="20"
      height="20"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.45557 3.89441H20.4556V16.8944H17.4556V6.89441H9.45557V3.89441ZM4.45557 8.89441V21.8944H15.4556V8.91477L4.45557 8.89441Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

export default CopyIcon
