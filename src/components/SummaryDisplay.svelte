<script >
  export let summary;
</script>

<div>
  <h2 class="text-2xl font-semibold mb-4 h-full">Summary</h2>
  {#if summary}
   <div class="scroll_viewe h-[70vh] px-5 overflow-x-auto">
    <p class="">{summary}
    </p>
   </div>
  {:else}
    <p class=" italic">Upload a document to see its summary here. lorem500</p>
  {/if}
</div>


<style>
.scroll_viewe::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #f5f5f524;
}

.scroll_viewe::-webkit-scrollbar
{
	width: 5px;
	background-color: #f5f5f505;
	border-radius: 10px;

}

.scroll_viewe::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: rgba(128, 128, 128, 0.34);
}

</style>
