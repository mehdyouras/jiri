<template>
  <div>

    <b-form-group
              label="Nom du projet"
              label-for="project-name"
              :invalid-feedback="this.errors.first('project-name')"
              :state="!this.errors.has('project-name')"
            >
              <b-form-input id="project-name" name="project-name" type="text" v-validate="'required'" v-model.trim="name" :class="{'is-invalid': this.errors.has('project-name')}"></b-form-input>
    </b-form-group>
    
    <b-form-group
              label="Description"
              label-for="description"
              :invalid-feedback="this.errors.first('description')"
              :state="!this.errors.has('description')"
            >
              <b-form-input id="description" name="description" type="text" v-validate="'required'" v-model.trim="description" :class="{'is-invalid': this.errors.has('description')}"></b-form-input>
    </b-form-group>

    <b-form-group
              label="Pondération"
              label-for="project-weight"
              :invalid-feedback="this.errors.first('project-weight')"
              :state="!this.errors.has('project-weight')"
            >
              <b-form-input id="project-weight" name="project-weight" type="number" v-validate="'required|decimal:2'" v-model.trim="weight" :class="{'is-invalid': this.errors.has('project-weight')}"></b-form-input>
    </b-form-group>

    <b-button variant="primary" @click.prevent="createProject">Ajouter</b-button>
  </div>
</template>

<script>
import {Bus} from '../../../Bus'

export default {
  name: 'ProjectForm',
  data() {
    return {
      name: "",
      description: "",
      weight: "",
    }
  },
  methods: {
    createProject() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let {name, description, weight} = this;
          weight = parseFloat(weight);
          
          Bus.$emit('createProject', {name, description, weight});
          this.$emit('projectCreated')
          this.name = "";
          this.description = "";
          this.weight = "";

          return;
        }
      });
    }
  },
  created() {
        this.$emit('formHasChanged')
    }
}
</script>

