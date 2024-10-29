import { createStore } from 'vuex'
import characters from './modules/characters'
import authors from './modules/authors'
import theme from './modules/theme'

export default createStore({
  modules: {
    characters,
    authors,
    theme
  }
})