export default {
  namespaced: true,
  state: {
    characters: [
      {
        id: 1,
        name: 'Aria Nightshade',
        authorId: 1,
        image: '/placeholder.svg?height=400&width=300',
        details: {
          Age: '25',
          Race: 'Elf',
          Class: 'Rogue'
        },
        description: 'Aria is a skilled elven rogue with a mysterious past...',
        stories: [
          {
            id: 1,
            title: 'The Heist',
            content: 'Aria\'s first big score was a daring heist in the royal palace...'
          }
        ]
      },
      // Add more characters here
    ]
  },
  getters: {
    getCharacterById: (state) => (id) => {
      return state.characters.find(character => character.id === id)
    }
  },
  mutations: {
    addStory(state, { characterId, story }) {
      const character = state.characters.find(c => c.id === characterId)
      if (character) {
        character.stories.push(story)
      }
    }
  },
  actions: {
    addNewStory({ commit }, { characterId, story }) {
      commit('addStory', { characterId, story })
    }
  }
}