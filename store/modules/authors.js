export default {
  namespaced: true,
  state: {
    authors: [
      {
        id: 1,
        
        name: 'Jane Doe',
        characters: [1] // Character IDs
      },
      // Add more authors here
    ]
  },
  getters: {
    getAuthorById: (state) => (id) => {
      return state.authors.find(author => author.id === id)
    }
  }
}
