<template>
  <aside class="sidebar" :class="{ 'sidebar-open': isOpen }">
    <button class="toggle-btn" @click="toggleSidebar">
      <MenuIcon v-if="!isOpen" />
      <XIcon v-else />
    </button>
    <nav>
      <ul>
        <li v-for="author in authors" :key="author.id">
          <div
            class="author-item"
            @click="toggleAuthor(author.id)"
            @mousedown="startLongPress(author)"
            @mouseup="cancelLongPress"
            @mouseleave="cancelLongPress"
            @touchstart.prevent="startLongPress(author)"
            @touchend.prevent="cancelLongPress"
            @touchcancel.prevent="cancelLongPress"
          >
            {{ author.name }}
            <ChevronDownIcon v-if="!openAuthors.includes(author.id)" />
            <ChevronUpIcon v-else />
          </div>
          <transition name="slide">
            <ul v-if="openAuthors.includes(author.id)">
              <li v-for="characterId in author.characters" :key="characterId">
                <router-link :to="{ name: 'character', params: { id: characterId } }">
                  {{ getCharacterName(characterId) }}
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </nav>
    <div class="theme-switcher">
      <button
        v-for="theme in themes"
        :key="theme"
        :class="['theme-btn', { active: currentTheme === theme }]"
        :style="{ backgroundColor: getThemeColor(theme) }"
        @click="setTheme(theme)"
      ></button>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { MenuIcon, XIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-vue-next'

const store = useStore()
const router = useRouter()

const isOpen = ref(false)
const openAuthors = ref([])
const longPressTimer = ref(null)

const authors = computed(() => store.state.authors.authors)
const currentTheme = computed(() => store.state.theme.current)
const themes = ['default', 'elegant', 'cute']

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const toggleAuthor = (authorId) => {
  const index = openAuthors.value.indexOf(authorId)
  if (index === -1) {
    openAuthors.value.push(authorId)
  } else {
    openAuthors.value.splice(index, 1)
  }
}

const startLongPress = (author) => {
  longPressTimer.value = setTimeout(() => {
    router.push({ name: 'author', params: { id: author.id } })
  }, 500)
}

const cancelLongPress = () => {
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value)
  }
}

const setTheme = (theme) => {
  store.commit('theme/setTheme', theme)
}

const getThemeColor = (theme) => {
  const themeColors = {
    default: '#3498db',
    elegant: '#2c3e50',
    cute: '#ff69b4'
  }
  return themeColors[theme]
}

const getCharacterName = (characterId) => {
  const character = store.getters['characters/getCharacterById'](characterId)
  return character ? character.name : 'Unknown Character'
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: var(--sidebar);
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  left: -250px;
  top: 0;
  transition: left 0.3s ease;
  z-index: 1000;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar-open {
  left: 0;
}

.toggle-btn {
  position: absolute;
  right: -40px;
  top: 10px;
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

.author-item {
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s ease;
}

.author-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 1000px;
  opacity: 1;
}

.theme-switcher {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
}

.theme-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.theme-btn:hover {
  transform: scale(1.1);
}

.theme-btn.active {
  box-shadow: 0 0 0 2px white, 0 0 0 4px var(--primary);
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    left: -100%;
  }

  .sidebar-open {
    left: 0;
  }

  .toggle-btn {
    right: 10px;
    top: 10px;
  }
}
</style>
