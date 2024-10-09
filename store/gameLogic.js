export const state = () => ({
    myhand: [],
    table: [],
});

export const mutations = {
    refrechmyhand: (state, newCards) => {
        state.myhand = newCards;
    },
    refrechtable: (state, newCards) => {
        state.table = newCards;
    },
};

export const actions = {
    async getTable({ commit }) {
        const response = await this.$axios.get('/table');
        commit('refrechtable', response.data);
    },
};

export const getters = {
    getmyhand(state) {
        return state.myhand;
    },
    gettable(state) {
        return state.table;
    },
};
