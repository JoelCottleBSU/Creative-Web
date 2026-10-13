<script>
  import { roster } from './roster.svelte.js';
</script>

<div class="box">
  <h3>Submitted</h3>

  {#if roster.list.length === 0}
    <p>No pets registered yet. Add one using the form!</p>
  {:else}
    <ul>
      {#each roster.list as entry}
        <li>{entry.owner} has a pet {entry.type} named {entry.pet}</li>
      {/each}
    </ul>
  {/if}
</div>