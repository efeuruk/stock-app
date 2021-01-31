<template>
  <div class="row">
    <div class="col-6">
      <Input placeholder="Ürün arayın" />
    </div>
    <div class="col-6">
      <Select :options="mockSelect" />
      <!--Dinamik gelecek-->
      <select class="custom-select">
        <option value="">Kategori seçin</option>
        <option value="hammadde">Hammadde</option>
        <option value="katki_malzemeleri">Katkı Malzemeleri</option>
        <option value="laminasyon_filmi">Laminasyon Filmi</option>
        <option value="karton_boru">Karton Boru</option>
        <option value="palet">Palet</option>
      </select>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";
export default {
  components: { Input, Select },
  name: "Home",
  data() {
    return {
      mockSelect: [
        { label: "Hammadde", value: "hammadde" },
        { label: "Katki Malzemeleri", value: "katki_malzemeleri" },
      ],
    };
  },
};
</script>

<style>
body {
  background-color: #f0f0f0;
}
</style>
