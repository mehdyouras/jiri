<template>
    <div>
        <li>
            <form>
                <header>
                    <h4>{{project.name}}</h4>
                </header>
                <label for="comment">Commentaire</label>
                <textarea name="comment" id="comment" cols="30" rows="10"></textarea>

                <label for="result">Note</label>
                <input type="number" name="result" id="result">

                <button>Envoyer</button>
            </form>
        </li>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
