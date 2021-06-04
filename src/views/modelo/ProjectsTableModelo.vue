<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
        </div>
        <div class="col text-right">
          <button class="btn btn-primary btn-sm" @click="crearUsuario()">
            Crear Modelo
          </button>
        </div>
      </div>
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
          <th>Marca</th>
          <th>Modelo</th>
          <th>Acciones</th>
        </template>

        <template v-slot:default="row">
          <td>
            <div class="media-body">
              <span class="name mb-0 text-sm">{{
                row.item.marca[0].marca
              }}</span>
            </div>
          </td>
          <td>
            <div class="media-body">
              <span class="name mb-0 text-sm">{{ row.item.modelo }}</span>
            </div>
          </td>

          <td>
            <!-- Form Crear -->
            <form role="form">
              <div v-if="showModalCreate">
                <transition name="modal">
                  <div class="modal-mask">
                    <div class="modal-wrapper">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Crear Marca</h5>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span
                                aria-hidden="true"
                                @click="showModalCreate = false"
                                >&times;</span
                              >
                            </button>
                          </div>
                          <div class="modal-body">
                            <div class="form-row">
                              <div class="form-group col-md-6">
                                <div class="input-group">
                                  <div class="form-group col-md-4">
                                <!-- <label for="inputState">Rol</label> -->
                                <select
                                  class="form-control"
                                  v-model="modelCrear.marca"
                                  
                                >
                                
                                  <option v-for="(item, index) in marca" :key="index">{{item.marca}}</option>
                                </select>
                              </div>
                                </div>
                              </div>
                              <!-- <label for="inputName4">Nombres</label> -->
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Modelo"
                                v-model="modelCrear.modelo"
                                
                              />
                            </div>
                          </div>

                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-danger"
                              @click="showModalCreate = false"
                            >
                              Cerrar
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary"
                              @click="createMarca()"
                            >
                              Crear marca
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </form>

            <div class="row">
              <button
                class="btn btn-danger btn-sm"
                @click="eliminar(row.item._id)"
              >
                Eliminar
              </button>
            </div>
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    ></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import router from "../../router";
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
      url: this.$store.state.url,
      tableData: [],
      loading: false,
      showModalCreate: false,
      notifications: [],
      marca: [],
      modelCrear: {
        modelo:"",
        marca: "",
      },
    };
  },
  components: {},
  methods: {
    async materias() {
      try {
        const res = await fetch(this.url + "api/admin/getModelos", {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.toke,
          },
        });
        this.tableData = await res.json();

        const result = await fetch(this.url + "api/admin/getBrands", {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.toke,
          },
        });
        this.marca = await result.json();
        console.log(this.marca);
      } catch (error) {
        console.log(error);
      }
    },
    async refresh() {
      this.loading = true;
      this.materias();
      this.loading = false;
    },
    async crearUsuario() {
      this.showModalCreate = true;
    },

    async eliminar(index) {
      console.log(index);
      try {
        await fetch(this.url + `api/admin/${index}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.toke,
          },
        });

        this.refresh();
      } catch (error) {
        console.log(error);
      }
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
    verUsuario(index) {
      // console.log(index)
      router.push(`/verUsuario/${index}`);
    },
    async crearUser() {
      console.log(this.modelCrear);
    },
    async createMarca() {
      console.log(this.modelCrear);
      try {
        await fetch(this.url + `api/admin/createModelo/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.modelCrear),
        });
        this.showModalCreate = false;
        alert("Se ha crado nuevo modelo");
        this.refresh();
      } catch (error) {
        console.log("error: ", error);
      }
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
