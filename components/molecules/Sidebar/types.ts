export interface SidebarProps {
  children: React.ReactNode
}

export interface SidebarItemProps {
  icon: React.ReactNode
  text: string
  active?: boolean
  alert?: boolean
}