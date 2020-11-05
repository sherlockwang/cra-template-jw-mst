import { createContext, useContext } from 'react'
import { store } from './index'

// Create context for store
export const ModelContext = createContext(store)
export const useStore = () => useContext(ModelContext)
