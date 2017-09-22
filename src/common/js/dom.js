export function addClass(el, ClassName) {
  if (hasClass(el, ClassName)) {
    return
  }

  if (el.className) {
    let newClass = el.className.split(' ')
    newClass.push(ClassName)
    el.className = newClass.join(' ')
  } else {
    el.className = ClassName
  }
}

export function hasClass(el, ClassName) {
  let reg = new RegExp('(^|\\s)' + ClassName + '(\\s|$)')
  return reg.test(el.ClassName)
}