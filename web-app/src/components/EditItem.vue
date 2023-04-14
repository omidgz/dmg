<template>
  <div>
    <input type="text" v-model="itemName" />
    <button @click="onUpdate({ id: id, name: itemName })">Update</button>
    <button @click="onCancel()">Cancel</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      itemName: ""
    }
  },
  mounted() {
    this.itemName = this.name;
  },
  props: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    onCancel: { type: Function, required: true },
    onUpdate: { type: Function, required: true },
  },
};
</script>