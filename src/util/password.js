// function to convert a number to a string based on the given alphabet
//    example: if alphabet is 'abc',
//      0  -> 'a'
//      1  -> 'b'
//      2  -> 'c'
//      3  -> 'ba'
//      4  -> 'bb'
//      5  -> 'bc'
//      6  -> 'ca'
//      7  -> 'cb'
//      8  -> 'cc'
//      9  -> 'baa'
//      10 -> 'bab'
//      11 -> 'bac'
//      ...
export const toLetters = (num, alphabet) => {
  const mod = num % alphabet.length
  const pow = Math.floor(num / alphabet.length)
  const out = alphabet[mod]
  return pow ? toLetters(pow, alphabet) + out : out
}

// function to convert a string to a number based on the given alphabet
// note: the first character is considered a padding character, and
//       all sequences containing only that character are mapped to 0
// for the alphabet in the toLetters example:
//   'a', 'aa', 'aaa', 'aaaa', ... -> 0
export const fromLetters = (str, alphabet) => {
  if (str.length === 0) {
    return 0
  }
  const out = str[str.length - 1]
  const pow = fromLetters(str.slice(0, -1), alphabet)
  const mod = alphabet.indexOf(out)
  return pow * alphabet.length + mod
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
