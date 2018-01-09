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
              <b-form-input id="project-weight" name="project-weight" type="number" min="0" max="1" placeholder="Entre 0 et 1" v-validate="'required|decimal:2|min_value:0|max_value:1'" v-model.trim="weight" :class="{'is-invalid': this.errors.has('project-weight')}"></b-form-input>
    </b-form-group>

    <b-btn variant="primary" @click.prevent="createProject">
        <template v-if="!isMutationLoading">
            Ajouter
        </template>
        <spinner v-else></spinner>
    </b-btn>
  </div>
</template>

<script>
import {Bus} from '../../../Bus'
import Spinner from '../../common/Spinner'
import {mapGetters} from 'vuex'

export default {
  name: 'ProjectForm',
  components: {
        Spinner
  },
  data() {
    return {
      name: "",
      description: "",
      weight: "",
    }
  },
  computed: {
    ...mapGetters([
        'isMutationLoading'
    ])
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

