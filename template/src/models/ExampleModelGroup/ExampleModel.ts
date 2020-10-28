import { types, flow, unprotect } from 'mobx-state-tree'
import { get } from '~/utils/api'

export const childTree = types
  .model('Child', {
    id: '',
    name: '',
  })
  .actions(self => ({
    updateName(name) {
      self.name = name
    },
  }))

export const parentTree = types
  .model('Parent', {
    childList: types.optional(types.array(childTree), []),
    nameFilter: 'test-name',
  })
  .views(self => ({
    get filteredChild() {
      return self.childList.find(item => item.name === self.nameFilter) || {}
    },
  }))
  .actions(self => ({
    getChildList: flow(function* getOrderList(params) {
      const res = yield get('api/childlist.json', params)

      self.childList = res.data
    }),
    onChangeChildName(id, name) {
      const existedChild = self.childList.find(item => item.id === id)
      if (existedChild) {
        existedChild.updateName(name)
      }
    },
  }))

const modelInstance = parentTree.create()

unprotect(modelInstance)

export default modelInstance
