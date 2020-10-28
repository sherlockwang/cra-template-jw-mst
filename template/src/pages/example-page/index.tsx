import React, { useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ModelContext } from '~/models'
import './index.scss'
import CenterBox from '~/components/CenterBox'

function ExamplePage() {
  const { ExampleModel: model } = useContext(ModelContext)

  const onInputChange = useCallback(e => {
    model.nameFilter = e.target.value
  }, [])

  return (
    <main className="app-main">
      <CenterBox style={{ height: '100%' }}>
        JWang Mobx State Tree Starter kit
        <br />
        Input name: <input onChange={onInputChange} value={model.nameFilter} />
        <br />
        Example Model Data: nameFitler = {model.nameFilter}
        <br />
        <If condition={model.nameFilter === 'test-name'}>Default</If>
      </CenterBox>
    </main>
  )
}

ExamplePage.contextTypes = {
  ModelContext: PropTypes.object,
}

export default observer(ExamplePage)
