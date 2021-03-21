import assert from 'assert'
import faker from 'faker'

export default function setAPI() {

    const MAX_ITEMS = 10
    const EVEN_MULTIPLE = 2
    const generateCar = (mainDb, replicationDb) => {
        for (let index = 0; index < MAX_ITEMS; index++) {

            const car = {
                name: faker.vehicle.model(),
                available: true,
                gasAvailable: true,
                releaseYear: faker.date.past().getFullYear()
            }
            mainDb.add(car)

            if (!replicationDb) continue;

            if (index % EVEN_MULTIPLE !== 0) continue;
            replicationDb.add(car)
        }

        return mainDb
    }

    const carsDb1 = generateCar(new Set())
    assert.ok(carsDb1.size === MAX_ITEMS)

    const carsDb2 = generateCar(new Set(), carsDb1)
    assert.ok(carsDb2.size === MAX_ITEMS)
    assert.deepStrictEqual(carsDb1.size, (MAX_ITEMS + (MAX_ITEMS / EVEN_MULTIPLE)))

    const replications = new Set([...carsDb1].filter(car => carsDb2.has(car)))
    assert.deepStrictEqual(replications.size, (MAX_ITEMS / EVEN_MULTIPLE))

    const uniqueFromDb1 = new Set([...carsDb1].filter(user => !carsDb2.has(user)))
    assert.deepStrictEqual(uniqueFromDb1.size, MAX_ITEMS)

    const uniqueFromDb2 = new Set([...carsDb2].filter(user => !carsDb1.has(user)))

    // vai ser só os ids impares pq o db1 vai ser removido
    assert.deepStrictEqual(uniqueFromDb2.size, MAX_ITEMS / EVEN_MULTIPLE)

    const allDatabaseWithoutReplications = new Set([...carsDb1, ...carsDb2])
    assert.deepStrictEqual(allDatabaseWithoutReplications.size, MAX_ITEMS * EVEN_MULTIPLE)

    // adicionando manualmente
    for (const item of carsDb1) carsDb2.add(item)
    assert.deepStrictEqual(carsDb2.size, MAX_ITEMS * EVEN_MULTIPLE)


    console.log('replicated data', replications.size)
    console.log('unique items on db1 that is not included in db2 ', uniqueFromDb1.size)
    console.log('unique items on db2 that is not included in db1', uniqueFromDb2.size)
    console.log('unique items on all dbs', allDatabaseWithoutReplications.size)
}
