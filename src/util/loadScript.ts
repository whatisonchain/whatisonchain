let loadedScript: string[] = []

export const loadScript = (src: string, onload: any, force = false) => {
  if (loadedScript.indexOf(src) !== -1) {
    onload()
    return
  }
  const js = document.createElement("script")
  js.src = src
  js.onload = onload
  js.onerror = function() {
    console.error("Failed to load script:", src)
  }
  document.head.appendChild(js)
  loadedScript.push(src)
}
