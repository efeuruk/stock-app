<template>
  <div>
    <h1>Ürün Ekle</h1>
    <form>
      <Input label="İsmi" />
      <Input label="Birimi" />
      <select>
        <option></option>
      </select>
      <Input label="Olması Gereken" />
      <Input label="Stok Miktarı" />
      <Input label="Tedarik Süresi" />
      <button class="btn btn-dark btn-block">Kaydet</button>
    </form>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
export default {
  components: { Input },
  name: "AddProduct",
};
</script>

<style></style>
