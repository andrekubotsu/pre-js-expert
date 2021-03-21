import { database } from '../shared/data.mjs'

// aplicando uma closure (não é necessário no Chrome 89 em diante)
; 
(async () => {
    const platform = globalThis.window ? 'browser' : 'console'
    const { default: ViewFactory } = await import(`./../platforms/${platform}/index.mjs`)
    
    const app = new ViewFactory()
    
    app.render(database)
})()
