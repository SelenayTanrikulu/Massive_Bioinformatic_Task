import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      characters: [],  // Karakter verileri
      searchQuery: '',  // Arama sorgusu
      sortOption: 'name', // Varsayılan sıralama seçeneği
      pageSize: 20, // Sayfa boyutu
      currentPage: 1, // Şu anki sayfa
      totalResults: 0, // Toplam sonuç sayısı
      selectedCharacter: null, // Seçilen karakterin detayları
      errorMessage: '', // Hata mesajı
    };
  },
  mutations: {
    setCharacters(state, characters) {
      state.characters = characters;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    setSortOption(state, option) {
      state.sortOption = option;
    },
    setPageSize(state, size) {
      state.pageSize = size;
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setTotalResults(state, count) {
      state.totalResults = count;
    },
    setSelectedCharacter(state, character) {
      state.selectedCharacter = character;
    },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
  },
  actions: {
    async fetchCharacters({ commit, state }) {
      try {
        // Sayfa numarasına göre API'yi çağır
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${state.currentPage}`);
        const data = await response.json();
        
        // Karakterleri ve toplam sonuç sayısını güncelle
        commit('setCharacters', data.results);
        commit('setTotalResults', data.info.count);
      } catch (error) {
        commit('setErrorMessage', 'Veri alınırken hata oluştu.');
      }
    },
  },
  getters: {
    filteredCharacters(state) {
      // Arama sorgusuna göre filtreleme
      return state.characters.filter(character =>
        character.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    sortedCharacters(state, getters) {
      // Filtrelenmiş karakterler üzerinde sıralama işlemi
      const sorted = [...getters.filteredCharacters];
      if (state.sortOption === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      } else if (state.sortOption === 'status') {
        sorted.sort((a, b) => a.status.localeCompare(b.status));
      }
      return sorted;
    },
  },
});

export default store;
