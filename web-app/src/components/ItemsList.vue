<template>
  <div>
    <h1>Items</h1>
    <form @submit.prevent="createItem">
      <input type="text" v-model="newItemName" />
      <button type="submit">Create Item</button>
    </form>
    <ul>
      <li v-for="item in items" :key="item.id">
        <span :style="{ display: inEdit === item.id ? 'none' : 'initial' }">{{ item.name }}</span>
        <EditItem :style="{ display: inEdit === item.id ? 'initial' : 'none' }" :id="item.id"
          :name="item.name" :on-cancel="() => { inEdit = undefined }" :on-update="updateItem" />
        <button :style="{ display: inEdit === item.id ? 'none' : 'initial' }"
          @click="inEdit = item.id">Edit</button>
        <button @click="deleteItem(item.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import EditItem from "./EditItem.vue";

export default {
  components: {
    EditItem,
  },
  data() {
    return {
      items: [],
      inEdit: undefined,
      newItemName: "",
    };
  },
  mounted() {
    axios.get(`api/items`).then(response => {
      this.items = response.data;
    });
  },
  methods: {
    createItem() {
      axios
        .post(`api/items`, { name: this.newItemName })
        .then(response => {
          this.items.push(response.data);
          this.newItemName = "";
        });
    },
    deleteItem(itemId) {
      axios.delete(`api/items/${itemId}`).then(() => {
        this.items = this.items.filter(item => item.id !== itemId);
      });
    },
    updateItem(item) {
      this.inEdit = undefined;
      axios
        .put(`api/items/${item.id}`, { id: item.id, name: item.name }).then(response => {
          const i = this.items.findIndex(itm => itm.id == item.id);
          this.items[i] = response.data;
        });
    }
  }
};
</script>
