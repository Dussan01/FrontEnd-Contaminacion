<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">Subir datos</h3>
            </div>
            <div class="card-body">
              <div class="row icon-examples">
                <p>
                  Sube los datos tomados desde la aplicación ElectroSmart de 1 a
                  100
                </p>

                <form action="">
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <!-- <label for="inputState">Rol</label> -->
                      <select class="form-control" v-model="selectMarca">
                        <option v-for="(item, index) in marca" :key="index">
                          {{ item.marca }}
                        </option>
                      </select>
                    </div>
                    <!-- <div class="form-group col-md-4">
                  
                      <select class="form-control" v-model="modelCrear.marca">
                        <option v-for="(item, index) in marca" :key="index">
                          {{ item.marca }}
                        </option>
                      </select>
                    </div> -->
                    <div class="form-group col-md-6">
                      <!-- <label for="inputName4">Nombres</label> -->
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Dato Wifi"
                        v-model="modelCrear.wifi"
                      />
                    </div>

                    <div class="form-group col-md-6">
                      <!-- <label for="inputApellidos4">Apellidos</label> -->
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Dato Bluetooth"
                        v-model="modelCrear.bluetooth"
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <!-- <label for="inputTelefono4">Telefono</label> -->
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Dato 2G"
                        v-model="modelCrear.dosG"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <!-- <label for="inputDireccion4">Dirección</label> -->
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Dato 3G"
                        v-model="modelCrear.tresG"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <!-- <label for="inputDireccion4">Dirección</label> -->
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Dato 4G"
                        v-model="modelCrear.cuatroG"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <!-- <label for="inputDireccion4">Dirección</label> -->
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Dato 5G"
                        v-model="modelCrear.cincoG"
                      />
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <!-- <label for="inputCity">Identificación</label> -->
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Observaciones"
                        v-model="modelCrear.observaciones"
                      />
                    </div>

                    <!-- <div class="form-group col-md-2">                      
                      <input type="file" v-mode="modelCrear.file"/>
                    </div> -->
                  </div>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="postdata()"
                  >
                    Crear data
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "register",
  data() {
    return {
      url: this.$store.state.url,
      marca: [],
      modelo: [],
      selectMarca: "",
      modelCrear: {
        wifi: "",
        bluetooth: "",
        dosG: "",
        tresG: "",
        cuatroG: "",
        cincoG: "",
        observaciones: "",
        // file: ""
      },
      id: "",
    };
  },
  methods: {
    ...mapActions(["datosUser"]),
    async getMarcas() {
      const res = await fetch(this.url + "api/admin/getBrands", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.toke,
        },
      });
      this.marca = await res.json();
      // const modelo = await fetch(this.url + "api/admin/getModelos", {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "x-access-token": this.toke,
      //   },
      // });
      // this.modelo = await modelo.json();
      // console.log(this.modelo);
    },
    async postdata() {
      const res = await fetch(
        this.url + `api/admin/getBrandById/${this.selectMarca}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.toke,
          },
        }
      );
      const data = await res.json();
      console.log(data[0]);
      console.log(this.id);

      await fetch(this.url + `api/user/createData/${this.id}&${data[0]}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.modelCrear),
      });

      await fetch(this.url + `api/user/verResultados`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.toke,
        },
      });

      alert("Se ha crado correctamente");
      // this.refresh();
    },
  },
  computed: {
    ...mapState(["toke"]),
  },
  created() {
    this.getMarcas();

    this.user = this.datosUser();
    this.user.then((value) => {
      this.id = value._id;
      console.log(value._id);
    });
    // this.convertir()
    // console.log(this.user)
    // console.log(this.user.Prom.nombres)
  },
};
</script>
<style></style>
