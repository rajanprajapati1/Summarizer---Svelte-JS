<script>
  import { writable } from 'svelte/store';
  import FileUploader from './FileUploader.svelte';
  import SummaryDisplay from './SummaryDisplay.svelte';
  import LoadingOverlay from './LoadingOverlay.svelte';

  // Writable stores for state management
  const filed = writable(null);
  const isLoading = writable(false);
  const summary = writable(null);

  // Reactive statement to log the store's value whenever it changes
  $: console.log($filed, "filed");

  function handleFileDrop(droppedFile) {
    filed.set(droppedFile); // Update the file store
    isLoading.set(true); // Set loading state

    // Simulating an API call for document summary
    setTimeout(() => {
      isLoading.set(false);
      summary.set(
        'This is a sample summary of the uploaded document. In a real application, this would be replaced with the AI-generated summary.'
      );
    }, 3000);
  }
</script>

<main class="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
  <div class="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="flex flex-col md:flex-row">
      <!-- File Upload Section -->
      <div class="w-full md:w-1/2 p-8 border-r border-gray-200">
        <h1 class="text-3xl font-bold mb-6">Document Summarizer</h1>
        <FileUploader on:fileDrop={handleFileDrop} />
        {#if $filed} <!-- Use $filed to access the store value -->
          <div class="mt-4">
            <h2 class="text-xl font-semibold mb-2">Uploaded File:</h2>
            <p>{$filed?.detail.name}</p> <!-- Display file name -->
          </div>
        {/if}
      </div>

      <!-- Summary Display Section -->
      <div class="w-full md:w-1/2 p-8">
        <SummaryDisplay summary={$summary} />
      </div>
    </div>
  </div>

  <!-- Loading Overlay -->
  {#if $isLoading}
    <LoadingOverlay />
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
