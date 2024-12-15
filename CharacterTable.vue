<template>
  <div>
    <!-- Filtreleme -->
    <input type="text" v-model="searchQuery" @input="filterData" placeholder="Arama yap..." />
    
    <!-- Sıralama -->
    <button @click="setSortOption('gender')">Cinsiyete Göre Sırala</button>
    <button @click="setSortOption('status')">Duruma Göre Sırala</button>

    <!-- Tablo -->
    <table>
      <thead>
        <tr>
          <th @click="setSortOption('name')">İsim</th>
          <th @click="setSortOption('status')">Durum</th>
          <th @click="setSortOption('species')">Tür</th>
          <th @click="setSortOption('gender')">Cinsiyet</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="character in sortedCharacters" :key="character.id" @click="selectCharacter(character)">
          <td>{{ character.name }}</td>
          <td>{{ character.status }}</td>
          <td>{{ character.species }}</td>
          <td>{{ character.gender }}</td>
        </tr>
        <tr v-if="sortedCharacters.length === 0">
          <td colspan="4">Veri bulunamadı.</td>
        </tr>
      </tbody>
    </table>

    <!-- Sayfalama -->
    <PaginationTable :total="totalResults" :current-page="currentPage" @page-changed="changePage" />

    <!-- Detaylar -->
    <CharacterDetail :character="selectedCharacter" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import PaginationTable from './PaginationTable.vue';
import CharacterDetail from './CharacterDetail.vue';

export default {
  components: {
    PaginationTable,
    CharacterDetail
  },
  computed: {
    ...mapState(['searchQuery', 'currentPage', 'totalResults', 'selectedCharacter']),
    ...mapGetters(['filteredCharacters', 'sortedCharacters']),
  },
  methods: {
    ...mapActions(['fetchCharacters']),

    filterData() {
      // 'searchQuery' değiştikçe, Vuex mutasyonu tetikleyerek filtreyi günceller
      this.$store.commit('setSearchQuery', this.searchQuery);
    },

    setSortOption(option) {
      this.$store.commit('setSortOption', option); // Sıralama opsiyonunu günceller
    },

    selectCharacter(character) {
      this.$store.commit('setSelectedCharacter', character); // Karakteri seçer
    },

    changePage(page) {
      this.$store.commit('setCurrentPage', page); // Sayfa değiştiğinde, yeni sayfa numarasını store'a kaydeder
      this.fetchCharacters(); // Yeni sayfa verilerini çeker
    }
  },
  mounted() {
    this.fetchCharacters(); // İlk veri çekme işlemi
  }
};
</script>
