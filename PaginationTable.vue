<template>
  <div>
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Önceki</button>
    <span>Sayfa {{ currentPage }} / {{ totalPages }}</span>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Sonraki</button>
  </div>
</template>

<script>
export default {
  props: {
    total: Number,
    currentPage: Number
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / 20); // Sayfa başına 20 karakter
    }
  },
  methods: {
    changePage(page) {
      this.$emit('page-changed', page);
    }
  }
};
</script>
