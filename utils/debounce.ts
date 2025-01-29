function debounce(func: Function, wait: number = 1000) {
  let timeout: NodeJS.Timeout
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func()
    }, wait)
  }
}

export default debounce
