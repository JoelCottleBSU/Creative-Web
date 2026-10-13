<script>
  import { roster } from './roster.svelte.js';

  let studentName = $state('');
  let petName = $state('');
  let selectedType = $state('');

  function submitRegister() {
    if (!studentName || !petName || !selectedType) return;
    
    roster.list.push({ 
      owner: studentName, 
      pet: petName, 
      type: selectedType 
    });
    
    studentName = '';
    petName = '';
    selectedType = '';
  }
</script>

<div class="box">
  <h3>Register</h3>
  
  <input type="text" bind:value={studentName} placeholder="Student name"/>
  
  <input type="text" bind:value={petName} placeholder="Pet's name"/>
  
  <select bind:value={selectedType}>
    <option value="">Choose pet type...</option>
    {#each roster.petOptions as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
  
  <button onclick={submitRegister}>Submit</button>
</div>