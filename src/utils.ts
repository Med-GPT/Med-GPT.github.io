const voidFn = () => { }

const echo = Object.assign(console.log, {
    wrn: console.warn,
    err: console.error,
    trw: (...args: any[]) => { throw new Error(...args) }
})

export {
    echo,
    voidFn,
}