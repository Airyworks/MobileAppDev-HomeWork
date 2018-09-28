import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'

const storage = new Storage({
  size: 1024 * 1024,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: false
})

export async function save(id, name, salary) {
  storage.save({
    key: 'salary',
    id,
    data: {
      name, salary, uniqueId: id
    }
  })
}

export async function find(id) {
  return await storage.load({
    key: 'salary',
    id
  })
}

export async function findAll() {
  return await storage.getAllDataForKey('salary')
}
