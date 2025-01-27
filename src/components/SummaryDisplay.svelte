<script >
  export let summary;
</script>

<div>
  <h2 class="text-2xl font-semibold mb-4">Summary</h2>
  {#if summary}
    <p class="text-gray-700">{summary}</p>
  {:else}
    <p class="text-gray-500 italic">Upload a document to see its summary here.</p>
  {/if}
</div>

