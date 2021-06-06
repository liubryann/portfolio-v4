import styles from './hamburger.module.scss'

interface HamburgerProps {
  open: boolean, 
  setOpen: any
}

export default function Hamburger({ open, setOpen }: HamburgerProps) {
  return (
    <div className={`${styles.hamburgerWrapper} ${open ? styles.open : ''}`} onClick={() => setOpen(!open)}>
      <div />
      <div />
    </div>
  )
}
