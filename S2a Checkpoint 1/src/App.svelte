<script>
  import RegisterForm from './RegisterForm.svelte';
  import PetList from './PetList.svelte';
</script>

<div class="row">
  <RegisterForm />
  <PetList />
</div>

<style>
  .row {
    display: flex;
    gap: 40px;
  }
</style>