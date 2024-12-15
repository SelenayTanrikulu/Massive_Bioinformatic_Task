<template>
  <div v-if="character" class="character-detail">
    <div class="detail-container">
      <div class="character-image">
        <img :src="character.image" alt="Character Image" />
      </div>
      <div class="character-info">
        <h2>{{ character.name }}</h2>
        <p><strong>Durum:</strong> {{ character.status }}</p>
        <p><strong>Tür:</strong> {{ character.species }}</p>
        <p><strong>Cinsiyet:</strong> {{ character.gender }}</p>
        <p><strong>Tür:</strong> {{ character.type }}</p>
        <p><strong>Konum:</strong> {{ character.location.name }}</p>
        <p><strong>Origin:</strong> {{ character.origin.name }}</p>
        <p><strong>İlk Oluşum:</strong> {{ character.created }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    character: Object,
  },
};
</script>
