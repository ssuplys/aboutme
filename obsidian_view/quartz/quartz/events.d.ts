interface CustomEventMap {
  prenav: CustomEvent<Record<string, never>>
  nav: CustomEvent<{ url: string }>
  themechange: CustomEvent<{ theme: "light" | "dark" }>
  readermodechange: CustomEvent<{ mode: "on" | "off" }>
  render: CustomEvent<Record<string, never>>
}
