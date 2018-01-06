<template>
  <div>
    <b-form-checkbox v-model="isChecked">
        {{project.name}}
    </b-form-checkbox>
    
    <b-collapse :id="project.id" v-model="isChecked">
      <div class="d-flex">
        <b-form-group class="col-6"
                label="URL repo Github"
                label-for="urlRepo"
                :invalid-feedback="this.errors.first('urlRepo')"
                :state="!this.errors.has('urlRepo')"
              >
                <b-form-input @input="save" :name="project.id + 'a'" :id="project.id + 'a'" type="text" v-validate="'url'" v-model.trim="urlRepo" :class="{'is-invalid': this.errors.has('urlRepo')}"></b-form-input>
        </b-form-group>
      
        <b-form-group class="col-6"
                  label="URL du projet"
                  label-for="urlProject"
                  :invalid-feedback="this.errors.first('urlProject')"
                  :state="!this.errors.has('urlProject')"
                >
                  <b-form-input @input="save" :name="project.id + 'a'" :id="project.id + 'a'" type="text" v-validate="'url'" v-model.trim="urlProject" :class="{'is-invalid': this.errors.has('urlProject')}"></b-form-input>
        </b-form-group>
      </div>
    </b-collapse>

  </div>
</template>

<script>
import _ from 'lodash'

export default {
    name: 'SingleProjectForm',
    data() {
      return {
        isChecked: false,
        urlRepo: '',
        urlProject: '',
        implementationIndex: '',
        implementationId: '',
      }
    },
    props: [
      'project',
      'student'
    ],
    methods: {
      save() {
        if(this.implementationIndex !== -1) {
          this.implementationId = this.student.implementations[this.implementationIndex].id;
        } else {
          this.implementationId = false;
        }
        this.$validator.validateAll('urlRepo', 'urlProject').then((result) => {
          if (result) {
            let payload = {
              id: this.implementationId,
              studentId: this.student.id,
              projectId: this.project.id,
              urlRepo: this.urlRepo,
              urlProject: this.urlProject,
            };
            this.$store.commit('currentAddedImplementations', payload)
            return;
          }
        });
      }
    },
    created() {
       this.implementationIndex = _.findIndex(this.student.implementations, {project: {id: this.project.id}});
        if(this.implementationIndex !== -1) {
          this.isChecked = true;
          this.urlRepo = this.student.implementations[this.implementationIndex].urlRepo;
          this.urlProject = this.student.implementations[this.implementationIndex].urlProject;
        }
    }
}
</script>

<style>

</style>
