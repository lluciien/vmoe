<template>
  <div class="app" :class="currentTheme">
    <Sidebar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Sidebar from './components/Sidebar.vue'

const store = useStore()
const currentTheme = computed(() => store.state.theme.current)
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #3498db;
  --secondary: #2ecc71;
  --background: #f5f5f5;
  --text: #333333;
  --sidebar: #ffffff;
}

.elegant {
  --primary: #2c3e50;
  --secondary: #34495e;
  --background: #ecf0f1;
  --text: #2c3e50;
  --sidebar: #ffffff;
}

.cute {
  --primary: #ff69b4;
  --secondary: #ff9ff3;
  --background: #ffeef8;
  --text: #4a4a4a;
  --sidebar: #fff0f5;
}

body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--background);
  color: var(--text);
}

.app {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
