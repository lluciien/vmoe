<template>
  <div class="character-page" v-if="character">
    <div class="character-content">
      <div class="character-image">
        <img :src="character.image" :alt="character.name" />
      </div>
      <div class="character-info">
        <h1>{{ character.name }}</h1>
        <p class="author">by {{ getAuthorName(character.authorId) }}</p>
        <div class="character-details">
          <div v-for="(value, key) in character.details" :key="key" class="detail-item">
            <strong>{{ key }}:</strong> {{ value }}
          </div>
        </div>
        <p class="description">{{ character.description }}</p>
      </div>
    </div>
    <div class="character-stories">
      <h2>Stories</h2>
      <div v-for="story in character.stories" :key="story.id" class="story-item">
        <h3>{{ story.title }}</h3>
        <p>{{ story.content }}</p>
      </div>
      <button @click="addStory" class="add-story-btn">Add New Story</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const character = computed(() => {
  const characterId = parseInt(route.params.id)
  return store.getters['characters/getCharacterById'](characterId)
})

const getAuthorName = (authorId) => {
  const author = store.state.authors.find(a => a.id === authorId)
  return author ? author.name : 'Unknown Author'
}

const addStory = () => {
  // Implement add story functionality
  console.log('Add new story')
}
</script>

<style scoped>
.character-page {
  max-width: 1200px;
  margin: 0 auto;
}

.character-content {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.character-image {
  flex: 1;
}

.character-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.character-info {
  flex: 2;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary);
}

.author {
  font-style: italic;
  margin-bottom: 1rem;
  color: var(--secondary);
}

.character-details {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.detail-item {
  background-color: rgba(var(--primary-rgb), 0.1);
  padding: 0.5rem;
  border-radius: 4px;
}

.description {
  line-height: 1.6;
}

.character-stories {
  margin-top: 2rem;
}

.story-item {
  background-color: rgba(var(--secondary-rgb), 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.story-item h3 {
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.add-story-btn {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-story-btn:hover {
  background-color: var(--secondary);
}
</style>
