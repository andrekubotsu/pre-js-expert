import assert from 'assert'

export default function mapAPI() {
    
    const itemObj = { name: 'Andre' } // Objeto classico

    const itemMap = new Map([       // Objeto criado pelo Map API
        ['name', 'Andre']
    ])

    itemObj.birthDay = '25/04/1995'
    assert.ok(itemObj.birthDay === '25/04/1995') // testando a inclusão do birthDay

    itemMap.set('birthDay', '25/04/1995')
    assert.deepStrictEqual(itemMap.get('birthDay'), '25/04/1995') // testando a inclusão pelo Map

    // if(itemObj.birthDay === 0 | null | undefined) {} // forma de validação comum, mas que só valida o valor e não a chave

    assert.ok(itemObj.hasOwnProperty('birthDay')) // validação

    assert.ok(itemMap.has('birthDay')) // validação pelo Map

    // para deletar uma chave num objeto
   // itemObj.birthDay = undefined // dessa forma seta apenas o valor, a chave continua lá
    delete itemObj.birthDay // dessa forma deleta mesmo a chave e o valor, porém há problema de performance
    assert.ok(itemObj.hasOwnProperty('birthDay') === false) // validando se foi mesmo deletado

    itemMap.delete('birthDay') // delete pelo Map API
    assert.ok(itemMap.has('birthDay') === false)

    // verificando o tamanho do objeto
    assert.deepStrictEqual(Object.keys(itemObj).length, 1)
    assert.deepStrictEqual(itemMap.size, 1)

    assert.deepStrictEqual(Object.entries(itemObj), [['name', 'Andre']])
    assert.deepStrictEqual([...itemMap], [['name', 'Andre']])

    for(const [key, value] of Object.entries(itemObj)){
        assert.deepStrictEqual([key, value], ['name', 'Andre'])
    }

    for(const [key, value] of itemMap){
        assert.deepStrictEqual([key, value], ['name', 'Andre'])
    }

    // para iterar e deletar cada key
    Object.keys(itemObj).map(key => delete itemObj[key])
    assert.deepStrictEqual(Object.keys(itemObj), [])

    itemMap.clear()
    assert.deepStrictEqual([...itemMap.keys()], [])

    const t = {
        toString(){
            return 'aeee'
        }
    }
    assert.deepStrictEqual(String(t), 'aeee')

    const m = new Map()
    m.set('toString', 'teste')
    assert.deepStrictEqual(String(m), '[object Map]')
}