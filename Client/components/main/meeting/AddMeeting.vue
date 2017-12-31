<template>
    <div>
        <li>
            <form>
                <header>
                    <h4>{{project.name}}</h4>
                </header>
                <label for="comment">Commentaire</label>
                <textarea v-validate="'required'" name="comment" id="comment" cols="30" rows="10"></textarea>
                <span v-show="this.errors.has('comment')">{{this.errors.first('comment')}}</span>
                
                <label for="result">Note</label>
                <input v-validate="'decimal:2'" type="number" name="result" id="result">
                <span v-show="this.errors.has('result')">{{this.errors.first('result')}}</span>

                <button>Envoyer</button>
            </form>
        </li>
    </div>
</template>

<script>
export default {
    name:'AddMeeting'
}
</script>

<style>

</style>
