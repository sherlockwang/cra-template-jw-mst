import ExampleModel from './ExampleModel'

it('case: expect ExampleModel default value is correct', () => {
  const model = ExampleModel
  expect(model.nameFilter).toEqual('test-name')
  expect(model.childList).toEqual([])
})

it('case: expect ExampleModel view is correct', () => {
  const model = ExampleModel
  model.nameFilter = 'test1'
  const child1 = { id: '1', name: 'test1' }
  model.childList = [child1]
  expect(model.filteredChild).toEqual(child1)
})

it('case: expect ExampleModel action is correct', () => {
  const model = ExampleModel
  model.childList = [{ id: '1', name: 'test1' }]
  model.onChangeChildName('1', 'test2')

  expect(model.childList.find(item => item.id === '1').name).toEqual('test2')
})
