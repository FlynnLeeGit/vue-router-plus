export const fakeReq = tag => {
  return new Promise(resolve => {
    console.log('fake req start', tag)
    setTimeout(() => {
      console.log('fake req end', tag)
      resolve()
    }, 500)
  })
}
