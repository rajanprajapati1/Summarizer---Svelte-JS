<script >
  import { createEventDispatcher } from 'svelte';
  import { CloudIcon } from 'lucide-svelte';

  const dispatch = createEventDispatcher();
  let dropzone;
  let isDragActive = false;

  function onDragOver(event) {
    event.preventDefault();
    isDragActive = true;
  }

  function onDragLeave() {
    isDragActive = false;
  }

  function onDrop(event) {
    event.preventDefault();
    isDragActive = false;
    const files = event.dataTransfer?.files;
    console.log(files)
    if (files && files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        dispatch('fileDrop', file);
      } else {
        alert('Invalid file type. Please upload PDF, DOCX, XLSX, RTF, or TXT files.');
      }
    }
  }

  function onClick() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.docx,.xlsx,.rtf,.txt';
    input.onchange = (event) => {
      const files = (event.target).files;
      console.log(files,"click")
      if (files && files.length > 0) {
        dispatch('fileDrop', files[0]);
      }
    };
    input.click();
  }

  function isValidFileType(file) {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/rtf',
      'text/plain'
    ];
    return validTypes.includes(file.type);
  }
</script>

<div
  bind:this={dropzone}
  on:dragover={onDragOver}
  on:dragleave={onDragLeave}
  on:drop={onDrop}
  on:click={onClick}
  class="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors"
  class:border-blue-500={isDragActive}
  class:bg-blue-50={isDragActive}
  class:border-gray-300={!isDragActive}
  class:hover:border-gray-400={!isDragActive}
>
  <CloudIcon class="mx-auto h-12 w-12 text-gray-400" />
  <p class="mt-2 text-sm text-gray-600">
    Drag & drop a file here, or click to select a file
  </p>
  <p class="mt-1 text-xs text-gray-500">
    Supported formats: PDF, DOCX, XLSX, RTF, TXT
  </p>
</div>

