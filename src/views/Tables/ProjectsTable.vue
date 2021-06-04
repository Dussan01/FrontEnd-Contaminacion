<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
    <h5 class="text-center">Datos Obtenidos</h5>
    <p>Los siguientes datos son obtenidos de diferentes dispositivos con sus respectivas marcas, alaizando el WIFI, Bluetooth, 2G, 3G, 4G, 5G, Si desea contrubuir con la investigación agregado datos de tu dispositivo ingresa.</p>
    </div>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th>Marcas</th>
          <th>WIFI</th>
          <th>Bluetooth</th>
          <th>2G</th>
          <th>3G</th>
          <th>4G</th>
          <th>5G</th>
        </template>

        <template v-slot:default="row">
          <td>
            <div class="media-body">
              <span class="name mb-0 text-sm">{{ row.item.marca[0].marca }}</span>
            </div>
          </td>
          <td class="budget">
            {{ row.item.wifi }}
          </td>
          <td class="budget">
            {{ row.item.bluetooth }}
          </td>
          <td class="budget">
            {{ row.item.dosG }}
          </td>
          <td class="budget">
            {{ row.item.tresG }}
          </td>
          <td class="budget">
            {{ row.item.cuatroG }}
          </td>
          <td class="budget">
            {{ row.item.cincoG }}
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <!-- <base-pagination total="30"></base-pagination> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "projects-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  data() {
    return {
      tipo: "/",
      url: this.$store.state.url,
      tableData: [],
      loading: false,
    };
  },
  components: {},
  methods: {
    async datos() {
      try {
        
        const res = await fetch(this.url + `api/datos/getDatos`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.tableData = await res.json();
      } catch (error) {
        console.log(error);
      }
    },
    async refresh() {
      this.loading = true;
      this.datos();
      this.loading = false;
    },
    makeToast(titulo, texto, tipo) {
      this.toastCount++;
      this.$bvToast.toast(texto, {
        title: titulo,
        variant: tipo,
        autoHideDelay: 5000,
        appendToast: true,
      });
    },
  },
  computed: {
    ...mapState(["toke"]),
  },
  async created() {
    this.refresh();
  },
};
</script>
<style  scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
