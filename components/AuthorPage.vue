<template>
  <div class="author-page" v-if="author">
    <div class="author-content">
      <div class="author-image">
        <img :src="author.image" :alt="author.name" />
      </div>
      <div class="author-info">
        <h1>{{ author.name }}</h1>
        <p class="bio">{{ author.bio }}</p>
        <div class="author-details">
          <div v-for="(value, key) in author.details" :key="key" class="detail-item">
            <strong>{{ key }}:</strong> {{ value }}
          </div>
        </div>
      </div>
    </div>
    <div class="author-characters">
      <h2>Characters</h2>
      <div class="character-grid">
        <div v-for="characterId in author.characters" :key="characterId" class="character-card">
          <router-link :to="{ name: 'character', params: { id: characterId } }">
            <img :src="getCharacterImage(characterId)" :alt="getCharacterName(characterId)" />
            <h3>{{ getCharacterName(characterId) }}</h3>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const author = computed(() => {
  const authorId = parseInt(route.params.id)
  return store.getters['authors/getAuthorById'](authorId)
})

const getCharacterImage = (characterId) => {
  const character = store.getters['characters/getCharacterById'](characterId)
  return character ? character.image : '/placeholder.svg?height=200&width=150'
}

const getCharacterName = (characterId) => {
  const character = store.getters['characters/getCharacterById'](characterId)
  return character ? character.name : 'Unknown Character'
}
</script>

<style scoped>
.author-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.author-content {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.author-image {
  flex: 1;
}

.author-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.author-info {
  flex: 2;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary);
}

.bio {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.author-details {
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

.author-characters h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--secondary);
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.character-card {
  background-color: var(--sidebar);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.character-card:hover {
  transform: translateY(-5px);
}

.character-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.character-card h3 {
  padding: 0.5rem;
  text-align: center;
  color: var(--text);
}
</style>
