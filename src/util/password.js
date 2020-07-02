// function to convert a number to a string based on the given alphabet
//    example: if alphabet is 'abc',
//      0 -> 'a'
//      1 -> 'b'
//      2 -> 'c'
//      3 -> 'aa'
//      4 -> 'ab'
//      5 -> 'ac'
//      6 -> 'ba'
//      ...
export const toLetters = (num, alphabet) => {
  const mod = num % alphabet.length
  const pow = Math.floor(num / alphabet.length)
  const out = alphabet[mod]
  return pow ? toLetters(pow, alphabet) + out : out
}

// function to convert a string to a number based on the given alphabet
// see example for toLetters
export const fromLetters = (str, alphabet) => {
  let out = 0
  const len = str.length
  let pos = len
  while (pos > 0) {
    pos -= 1
    out += alphabet.indexOf(str[pos]) * alphabet.length ** (len - 1 - pos)
  }
  return out
}

export const alphaLower = "abcdef"
export const alphaMixed = "abcdefABCDEF"

export const formatTime = (num) => {
  const days = Math.floor(num / 86400)
  const hours = Math.floor((num % 86400) / 3600)
  const minutes = Math.floor((num % 3600) / 60)
  const seconds = num % 60

  let result = ""
  if (days !== 0) {
    result += `${days}d`
  }
  if (hours !== 0) {
    result += `${hours}h `
  }
  if (minutes !== 0) {
    result += `${minutes}m `
  }
  if (seconds !== 0) {
    result += `${seconds.toFixed(5)}s`
  }
  return result
}
